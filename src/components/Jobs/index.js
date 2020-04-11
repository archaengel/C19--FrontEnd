import React, { useState, useEffect } from 'react';
import { Affix, Col, Layout, Row } from 'antd';
import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import { BoardHeader, JobCard } from './components';
import './styles/index.css';
import 'antd/dist/antd.css';
import { getJobs } from '../../actions/jobPostingActions';
import { useSelector, useDispatch } from 'react-redux';

const { Content, Header } = Layout;
const PAGE_SIZE = 5;
const useStyles = makeStyles({
  ul: {
    justifyContent: 'center',
  },
});

export const Jobs = () => {
  const classes = useStyles();
  const listings = useSelector((state) => state.jobsReducer.jobs);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const queryListings = async () => {
    await dispatch(getJobs());
  };

  const handlePageChange = (event, page) => {
    event.preventDefault();
    setCurrentPage(page);
  };

  useEffect(() => {
    queryListings();
  }, []);

  const dataSource =
    listings.length > PAGE_SIZE
      ? [...listings].splice((currentPage - 1) * PAGE_SIZE, PAGE_SIZE)
      : [...listings];

  return (
    <Container>
      <List className="jobs__list">
        {dataSource && dataSource.map((item) => <JobCard job={item} />)}
        {/* <List
              header={<BoardHeader />}
              dataSource={listings}
              renderItem={(item) => <JobCard job={item} />}
              pagination={{
                hideOnSinglePage: true,
                defaultCurrent: 1,
                defaultPageSize: 5,
                simple: true,
              }}
            /> */}
      </List>
      <Pagination
        count={
          Math.floor(listings.length / PAGE_SIZE) +
          (listings.length % PAGE_SIZE === 0 ? 0 : 1)
        }
        page={currentPage}
        onChange={handlePageChange}
        classes={{ ul: classes.ul }}
      />
    </Container>
  );
};
