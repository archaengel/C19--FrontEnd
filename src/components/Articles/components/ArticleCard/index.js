import React from 'react';
import moment from 'moment';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  avatar: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary,
  },
}));

export const ArticleCard = ({ article }) => {
  const classes = useStyles();
  const { description, jobTitle, postedDate } = article;
  const date = Date.parse(postedDate);
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar className={classes.avatar}>A</Avatar>
      </ListItemAvatar>
      <ListItemText>
        <Typography variant="h4" component="h2">
          {jobTitle}
        </Typography>
        <Typography variant="body1">{description}</Typography>
        <Typography variant="caption">
          {moment(date).format('MMM Do, YYYY')}
        </Typography>
      </ListItemText>
    </ListItem>
  );
};
