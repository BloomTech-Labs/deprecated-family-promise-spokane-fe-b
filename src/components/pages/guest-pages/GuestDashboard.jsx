import React, { useEffect, useState } from 'react';

import { axiosWithAuth } from '../../../api/axiosWithAuth';

// UI
import { Divider } from 'antd';

//redux
import actions from '../../../state/actions/families';
import { connect } from 'react-redux';

// state
import { useSelector } from 'react-redux';
import Popup from 'reactjs-popup';

const GuestDashboard = ({ fetchHousehold, fetchFamily }) => {
  const user = useSelector(state => state.CURRENT_USER);

  const fetchFamilyInformation = async () => {
    try {
      const res = await axiosWithAuth().get(`/users/${user.id}/family`);

      const family = res.data.family;

      fetchFamily(family.id);
    } catch (error) {
      alert('error');
    }
  };

  useEffect(() => {
    // this endpoint needs a family id to work
    // todo:
    // need to fetch family first with userID to get family
    // then get household with family id.
    // fetchFamily();
    fetchFamilyInformation();
  }, []);

  return (
    <div className="container">
      <h1>Guest dashboard</h1>
      <h1>Welcome To Family Promise of Spokane</h1>
      <h2>The facility has 12 beds left.</h2>
      <p> Would you like to check in? </p>
      <Popup trigger={<button>Popup</button>}>
        <div>
          <input type="text" />
        </div>
      </Popup>
    </div>
  );
};

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {
  fetchHousehold: actions.fetchHousehold,
  fetchFamily: actions.fetchFamily,
};

export default connect(mapStateToProps, mapDispatchToProps)(GuestDashboard);
