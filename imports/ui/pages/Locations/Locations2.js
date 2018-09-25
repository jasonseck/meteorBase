import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import LocationsCollection from '../../../api/Locations/Locations';
import { timeago, monthDayYearAtTime } from '../../../modules/dates';
import Loading from '../../components/Loading/Loading';
import BlankState from '../../components/BlankState/BlankState';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

const StyledDocuments = styled.div`
  table tbody tr td {
    vertical-align: middle;
  }
`;

const handleRemove = (documentId) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('documents.remove', documentId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Document deleted!', 'success');
      }
    });
  }
};
const Locations = ({
  loading, locations, match, history, ...props
}) => { console.log(locations);return (!loading ? (
  <StyledDocuments>
    <div className="page-header clearfix">
      <h4 className="pull-left">Documents</h4>
      <Link className="btn btn-success pull-right" to={`${match.url}/new`}>Add Document</Link>
    </div>
    {locations.length ?
      <Table responsive>
      {props.count.skip > 0 &&
        <Button
          onClick={()=> props.decreaseSkip()}
        >PREV</Button>

      }
      {locations.length == 75 &&
        <Button
          onClick={()=> props.increaseSkip()}
        >NEXT</Button>
      }

        <thead>
          <tr>
            <th>Title</th>
            <th>Last Updated</th>
            <th>Created</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {locations.map(({
            _id, name, createdAt, updatedAt
          }) => (
            <tr key={_id}>
              <td>{name}</td>
              <td>{timeago(updatedAt)}</td>
              <td>{monthDayYearAtTime(createdAt)}</td>
              <td>
                <Button
                  onClick={() => history.push(`${match.url}/${_id}`)}
                  block
                >
                  View
                </Button>
              </td>
              <td>
                <Button
                  onClick={() => handleRemove(_id)}
                  block
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        {props.count.skip > 0 &&
          <Button
            onClick={()=> props.decreaseSkip()}
          >PREV</Button>

        }

        {locations.length == 75 &&
          <Button
            onClick={()=> props.increaseSkip()}
          >NEXT</Button>
        }

      </Table> : <BlankState
        icon={{ style: 'solid', symbol: 'file-alt' }}
        title="You're plum out of documents, friend!"
        subtitle="Add your first document by clicking the button below."
        action={{
          style: 'success',
          onClick: () => history.push(`${match.url}/new`),
          label: 'Create Your First Document',
        }}
      />}
  </StyledDocuments>
) : <Loading />)};

class Locations2 extends React.Component {
constructor(props) {
  super(props)
  this.state = {
    name: 'Santa'
  }
}
render() {
  console.log(this.props);
  var {loading, locations, match, history} = this.props;
  return (
    <div>
      <div>
      <input
        value={this.props.filter.filter}
        onChange={(e)=>this.props.updateFilter(e.target.value)}
        style={{paddingRight:'60px'}}
        />
        <Button
          onClick={()=> this.props.clearFilter()}
          style={{marginLeft:'-60px'}}
        >CLEAR</Button>

      </div>
      <Locations {...this.props}/>
    </div>

  )
}
};

Locations2.propTypes = {
  loading: PropTypes.bool.isRequired,
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
const mapDispatchToProps = dispatch => ({
  mylogin : () => dispatch(handleOnLogin()),
  increaseSkip : () => dispatch ({ type:'INCREASE_SKIP'}),
  decreaseSkip : () => dispatch ({ type:'DECREASE_SKIP'}),
  updateFilter: data => {
    dispatch({
      type:'CHANGE_FILTER',
      data:data
    })
  },
  clearFilter: () => dispatch({ type:'CLEAR_FILTER'})

})
export default compose(
  withTracker((props)=>{
    console.log(props.count.skip)

    const subscription = Meteor.subscribe('locations.all',{
      skip:(props.count.skip * props.count.limit),
      limit:props.count.limit,
      name:props.filter.filter
    });
    return {
      loading: !subscription.ready(),
      locations: LocationsCollection.find({}).fetch()

    };
  }),
  connect(
    null,
    mapDispatchToProps
  )
)(Locations2);

//export default withTracker(() => {
//  const subscription = Meteor.subscribe('locations.all',{limit:25,skip:0});
//  return {
//    loading: !subscription.ready(),
//    locations: LocationsCollection.find({},{limit:25,skip:0}).fetch(),
//  };
//})(Locations);
