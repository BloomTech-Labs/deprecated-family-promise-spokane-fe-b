import React, { useEffect, useState } from 'react';

// ant design
import { Progress, Button } from 'antd';

//redux
import { connect } from 'react-redux';
import actions from '../../../state/actions/families';

// utils
import { returnPercentComplete } from '../../../utils/percentComplete';
import { useHistory } from 'react-router-dom';
import _ from 'underscore';

const GuestAnalytics = ({
  loading,
  household,
  fetchHousehold,
  fetchFamily,
}) => {
  const [percentComplete, setPercentComplete] = useState(0);
  const [missingFields, setMissingFields] = useState([]);
  const history = useHistory();

  const goToProfile = () => {
    // We pass this to our <Security /> component that wraps our routes.
    // It'll automatically check if userToken is available and push back to login if not :)
    history.push('/me');
  };
  const getPercentComplete = () => {
    // fetch household data object
    fetchHousehold();

    // calculates a percentage of complete values
    const percent = returnPercentComplete(household);
    setPercentComplete(percent[0]);
    setMissingFields(percent[1]);
  };

  const formatMissingData = () => {
    // counts all missing fields using underscore countby library to cound a modified key value
    // example modified values changes list_indefinite_conditions to "List indefinite conditions"
    // countBy method return an object of keys and their count
    const countMissing = _.countBy(missingFields, function(field) {
      let modified = field;
      return (
        field
          .toString()
          .charAt(0)
          .toUpperCase() +
        modified
          .slice(1)
          .split('_')
          .join(' ')
      );
    });

    let modifiedStringValues = [];

    // builds an array of messages to render
    for (let value in countMissing) {
      let string = `${value} missing from ${countMissing[value]} family member(s). `;
      modifiedStringValues.push(string);
    }

    console.log(modifiedStringValues);

    return modifiedStringValues;
  };

  useEffect(() => {
    fetchFamily();
    fetchHousehold();
  }, []);

  return (
    <div className="analytics-container">
      <h1> Guest Analytics</h1>
      <div className="progess-container">
        <div className="progress-section">
          <Progress type="circle" percent={percentComplete} />
          <p> Doesn't look correct? </p>
          <Button type="primary" loading={loading} onClick={getPercentComplete}>
            Refresh
          </Button>
          <p>
            You have completed {percentComplete}% of your household's intake
            form!
          </p>
        </div>

        <div className="missing-info-section">
          <h4>Missing household information: </h4>
          {formatMissingData().map(msg => {
            return <p>{msg}</p>;
          })}
          {percentComplete < 100 ? (
            <div>
              <p>
                Click the link below to complete or update your information.{' '}
              </p>
              <Button onClick={goToProfile}>Go to Profile </Button>
            </div>
          ) : (
            <p>You're all set!</p>
          )}
        </div>
      </div>
      <div />
    </div>
  );
};

function mapStateToProps(state) {
  return { household: state.HOUSEHOLD, loading: state.LOADING };
}

const mapDispatchToProps = {
  fetchHousehold: actions.fetchHousehold,
  fetchFamily: actions.fetchFamily,
};
export default connect(mapStateToProps, mapDispatchToProps)(GuestAnalytics);
