import { Link, useParams } from 'react-router-dom';
import Button from './../components/Button';
import getData from '../utils/getData';
import classes from "./SinglePage.module.css";
import DeleteProject from './../components/Project/DeleteProject';
import Date from './../components/Date/Date';
import styles from './../components/Project/ProjectCard.module.css';
import { useEffect } from 'react';
import { useState } from 'react';

function SingleProject() {
  const [project, setProject] = useState();
  const { id } = useParams();
  let user = localStorage.getItem('user');
  let userData = JSON.parse(user);
  let userRole = userData && userData.role;

  async function getProject() {
    const project = await getData(`/projects/${id}`);
    if (project.status === 'fail') {
      return console.log('error ', project.message);
    }
    setProject(project.data.project);
  }
  useEffect(() => {
    getProject();
  }, []);
  return (
    <div className={styles.singlePage}>
      {project && (
        <div className={`${styles.container} ${classes.paddings}`}>
          <div className={styles.top}>
            <h3 className={`${styles.heading} hover`}>{project.name}</h3>
            <div className={styles.date}>
              <Date date={project.startDate} name="Start Date"></Date>
              <Date date={project.endDate} name="End Date"></Date>
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.img__box}>
              <img
                src="http://prcagrimex.co.th/en/wp-content/uploads/2014/04/dummy-image-green-e1398449160839.jpg"
                alt={project.name}
                className={styles.img}
              />
            </div>
            <div className={styles.right}>
              <div className={styles.row}>
                <div>
                  <span className={styles.small__heading}>
                    Total Members :{' '}
                  </span>
                  <span className={styles.text}>{project.members.length}</span>
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
                  <span className={styles.small__heading}>Documents : </span>
                  <span className={`${styles.text} ${styles.discription}`}>
                    {project.documents.length}
                  </span>
                  {project.documents.length > 0 &&
                    project.documents.map((e, i) => (
                      <span className={`${styles.text} ${styles.discription}`} key={i}>
                        {e}<br/>
                      </span>
                    ))}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.description}>
                  <span className={styles.small__heading}>Description : </span>
                  <span className={`${styles.text} ${styles.discription}`}>
                    {project.description}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {userRole === 'mentor' ? (
            <div className={`${styles.row} ${classes.margin}`}>
              <Link to={`edit-project/${project._id}`}>
                <Button className="model" name="Edit Project"></Button>
              </Link>
              <DeleteProject id={project._id}></DeleteProject>
            </div>
          ) : (
            ''
          )}
        </div>
      )}
    </div>
  );
}

export default SingleProject;
