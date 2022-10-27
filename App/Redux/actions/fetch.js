
import { Constants } from '@common';

const fetch = (dispatch, api, type, extra = {}) => api.get((err, data) => {
  // check the paging is finish
  let finish = false;

  if (err) {
    console.log(err);
  }

  if (typeof data == 'undefined') {
    finish = true;
    dispatch({ type: type, payload: [], extra, finish });
  }

  // if (typeof data == 'undefined' || typeof data._paging.next == 'undefined')  {
  //     // finish = true;
  // }

  dispatch({ type: type, payload: data, extra, finish });
});

export default fetch;
