import axios from 'axios';
import { LOADED_JOBS, LOADING_JOBS, JOBS_ERROR } from '../types';

export const getJobs = () => async (dispatch) => {
  dispatch({ type: LOADING_JOBS });

  try {
    const res = await axios.get('http://localhost:3000/dev/jobPosting');
    if (res.status === 200) {
      dispatch({ type: LOADED_JOBS, payload: res.data.message });
    } else {
      dispatch({ type: JOBS_ERROR, payload: res.data.message });
    }
  } catch (error) {
    // handle error
    dispatch({ type: JOBS_ERROR, payload: error.message });
  }
};

export const getJobsBySearch = (query) => async (dispatch) => {
  dispatch({ type: LOADING_JOBS });

  try {
    const res = await axios.get(
      `http://localhost:3000/dev/jobPosting/searchjobs/${query}`
    );

    if (res.status === 200) {
      dispatch({ type: LOADED_JOBS, payload: res.data.message });
    } else {
      dispatch({ type: JOBS_ERROR, payload: res.data.message });
    }
  } catch (error) {
    // handle error
    dispatch({ type: JOBS_ERROR, payload: error.message });
  }
};
