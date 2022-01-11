import { Link } from 'react-router-dom';
import Button from '../Button';
import DeleteProject from './DeleteProject';
import Date from '../Date/Date';
import CutString from '../CutString';
import styles from './ProjectCard.module.css';

function ProjectCard(props) {
  const data = props.data;
  let user = localStorage.getItem('user');
  let userData = JSON.parse(user);
  let userRole = userData && userData.role;
  return (
    <>
      {data && data.length > 0 ? (
        data.map((project, i) => (
          <div className={styles.container} key={i}>
            <div className={styles.top}>
              <Link to={`/projects/${project._id}`}>
                <h3 className={`${styles.heading} hover`}>{project.name}</h3>
              </Link>
              {userRole === 'mentor' ? (
                <div className={styles.buttons}>
                  <Link to={`edit-project/${project._id}`}>
                    <Button className="model" name="Edit Project"></Button>
                  </Link>
                </div>
              ) : (
                ''
              )}
              <div className={styles.date}>
                <Date date={project.startDate} name="Start Date"></Date>
                <Date date={project.endDate} name="Last Date"></Date>
              </div>
            </div>
            <div className={styles.bottom}>
              <div className={styles.img__box}>
                <img
                  src="http://prcagrimex.co.th/en/wp-content/uploads/2014/04/dummy-image-green-e1398449160839.jpg"
                  alt={props.name}
                  className={styles.img}
                />
              </div>
              <div className={styles.right}>
                <div className={styles.row}>
                  <div>
                    <span className={styles.small__heading}>
                      Total Members :{' '}
                    </span>
                    <span className={styles.text}>
                      {project.members.length}
                    </span>
                  </div>
                  <div>
                    <span className={styles.small__heading}> Status : </span>
                    <span className={styles.text}>
                      {project.isCompleted ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                </div>
                <div className={styles.row}>
                  <div>
                    <span className={styles.small__heading}>Members : </span>
                    {project.members.map((member) => (
                      <span
                        className={styles.member_name}
                        key={member._id}
                        id={member._id}
                      >
                        {member.name}
                      </span>
                    ))}
                  </div>
                  <div>
                    <span className={styles.small__heading}> Approved : </span>
                    <span className={styles.text}>
                      {project.isApproved ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.description}>
                    <span className={styles.small__heading}>
                      Description :{' '}
                    </span>
                    <span className={`${styles.text} ${styles.discription}`}>
                      <CutString
                        str={project.description}
                        start="0"
                        end="200"
                      ></CutString>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {userRole === 'mentor' ? (
              <div className={styles.buttons}>
                <DeleteProject id={project._id}></DeleteProject>
              </div>
            ) : (
              ''
            )}
          </div>
        ))
      ) : (
        <div>
          <h3 className={styles.heading}>No Projects </h3>
        </div>
      )}
    </>
  );
}

export default ProjectCard;
