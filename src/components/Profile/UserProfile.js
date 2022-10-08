import ProfileForm from './ProfileForm';
import classes from './UserProfile.module.css';

const UserProfile = () => {
  return (
    <section className={classes.profile}>
      <h3>Your Updates</h3>
      <ProfileForm />
    </section>
  );
};

export default UserProfile;
