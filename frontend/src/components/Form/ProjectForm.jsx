import styles from './Form.module.css';
import classes from './ProjectForm.module.css';
import Button from '../Button';
import Loading from '../Loading/Loading';

function ProjectForm(props) {
  console.log(props.members);
  return (
    <div className={classes.container}>
      <form
        className={styles.form}
        onSubmit={props.onSubmit}
        id="project_form"
        encType="multipart/form-data"
      >
        <label htmlFor="form__name">Project Title</label>
        <input name="name" type="text" id="form__name" />
        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          min="2022-01-09"
          max="2025-12-31"
          name="startDate"
          id="startDate"
        />
        <label htmlFor="endDate">End Date</label>
        <input
          type="date"
          min="2022-01-09"
          max="2025-12-31"
          id="endDate"
          name="endDate"
        />
        <label htmlFor="feature_image">Project Feature Image</label>
        <input
          type="file"
          name="feature_image"
          id="feature_image"
          accept="image/*"
        />
        <label htmlFor="files">Choose Multiple Doucments</label>
        <input type="file" name="files" id="files" multiple />
        <label htmlFor="description" type="text-area">
          Description
        </label>
        <textarea id="description" rows="5" cols="50"></textarea>
        <label htmlFor="members">Members</label>
        {props.members && props.members.length > 0 && props.members[0]._id ? (
          props.members.map((user, i) => (
            <div className={styles.radio__container} key={i}>
              <div className={styles.radio__group}>
                <label htmlFor={user._id}>
                  {user.name}
                  <input
                    type="checkbox"
                    name="members"
                    id={user._id}
                    value={user._id}
                  />
                  <span
                    className={`${styles.checkmark} ${styles.checkmark__checkbox}`}
                  ></span>
                </label>
              </div>
            </div>
          ))
        ) : (
          <h3>No User Account created yet</h3>
        )}
        <label>Project Status</label>
        <div className={styles.radio__container}>
          <div className={styles.radio__group}>
            <label htmlFor="form__pending">
              Pending
              <input
                type="radio"
                name="status"
                id="form__pending"
                value="pending"
                defaultChecked
              />
              <span className={styles.checkmark}></span>
            </label>
          </div>
          <div className={styles.radio__group}>
            <label htmlFor="form__completed">
              Completed
              <input
                type="radio"
                name="status"
                value="completed"
                id="form__completed"
              />
              <span className={styles.checkmark}></span>
            </label>
          </div>
        </div>
        <label>Project Approval Status</label>
        <div className={styles.radio__container}>
          <div className={styles.radio__group}>
            <label htmlFor="approval_pending">
              Pending
              <input
                type="radio"
                name="approval"
                id="approval_pending"
                value="pending"
                defaultChecked
              />
              <span className={styles.checkmark}></span>
            </label>
          </div>
          <div className={styles.radio__group}>
            <label htmlFor="approval_completed">
              Completed
              <input
                type="radio"
                name="approval"
                value="completed"
                id="approval_completed"
              />
              <span className={styles.checkmark}></span>
            </label>
          </div>
        </div>
        {props.isLoading ? (
          <Loading></Loading>
        ) : (
          <Button name="Submit" className="model"></Button>
        )}
      </form>
    </div>
  );
}

export default ProjectForm;
