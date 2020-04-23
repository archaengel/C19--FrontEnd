import React, { useState, useLayoutEffect } from 'react';
import { ErrorBanner } from '../../lib/components';
import { useJobs } from '../../lib/hooks';
import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';
import Pagination from '@material-ui/lab/Pagination';
import { ArticleCard, ArticlesSkeleton } from './components';
import { makeStyles } from '@material-ui/core/styles';

const PAGE_SIZE = 10;
const useStyles = makeStyles({
  pagination: {
    justifyContent: 'center',
  },
  container: {
    minHeight: '100%',
    width: '66vw',
    padding: '16px',
  },
});

export const Articles = () => {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, loading, error] = useJobs();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, articles]);

  const handlePageChange = (event, page) => {
    event.preventDefault();
    setCurrentPage(page);
  };

  const dataSource =
    articles.length > PAGE_SIZE
      ? [...articles].splice((currentPage - 1) * PAGE_SIZE, PAGE_SIZE)
      : [...articles];

  return (
    <Container classes={{ root: classes.container }}>
      <ErrorBanner error={error} message={error} />
      <List>
        {loading && <ArticlesSkeleton />}
        {!loading &&
          dataSource &&
          dataSource.map((article) => <ArticleCard article={article} />)}
      </List>
      <Pagination
        count={
          Math.floor(articles.length / PAGE_SIZE) +
          (articles.length % PAGE_SIZE === 0 ? 0 : 1)
        }
        page={currentPage}
        onChange={handlePageChange}
        classes={{ ul: classes.pagination }}
      />
    </Container>
  );
};
