import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import Spinner from '../common/spinner';
import { getCurrentProfile } from '../../actions/profileActions';

class Dashboard extends Component {

    componentDidMount()
    {
        this.props.getCurrentProfile();
    }

    render() {
        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;

        let dashboardContent;

        if(profile === null || loading)
        {
            dashboardContent = <Spinner />
        }
        else
        {
            // Check if logged in user has profile data
            if(Object.keys(profile).length > 0)
            {
                dashboardContent = <h4>TODO: display profile</h4>
            }
            else
            {
                // User is logged in has no profile
                dashboardContent =
                    (
                        <div>
                            <p className="lead text-muted">Welcome {user.name} </p>
                            <p>You have not yet setup a profile, please add some info</p>
                            <Link to="/create-profile" className="btn btn-lg btn-info">
                                create profile
                            </Link>
                        </div>
                    )
            }
        }

        return (
            <div className="dashboard">
                <div className="contarer">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="dispaly-4">Dashboard</h1>
                            {dashboardContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);