import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

function UserAccount(props) {
  const { firstName, lastName, id, password, description } = props;
  const date = new Date();
  const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();

const dateWithSlashes = [year, month, day].join('/');
  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5" >
              {firstName} {lastName} ({id})
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {dateWithSlashes}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {description}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {password}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              View more...
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={"https://source.unsplash.com/random?wallpapers"}
            alt={"some"}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}

UserAccount.propTypes = {
  user: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserAccount;