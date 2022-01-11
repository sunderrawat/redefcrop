import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import getData from '../utils/getData';
import ProjectCard from '../components/Project/ProjectCard';
import Button from './../components/Button';
import styles from './Project.module.css';
import { Link } from 'react-router-dom';

function Projects() {
  const [data, setData] = useState();
  const deleteRender = useSelector((state) => state.render.deleteRender);
  console.log(deleteRender);
  let user = localStorage.getItem('user');
  let userData = JSON.parse(user);
  let userRole = userData && userData.role;
  async function getAllProjects() {
    const fetchData = await getData('/Projects');
    console.log(fetchData);
    if (fetchData !== 'error') {
      if (fetchData.status !== 'fail') {
        if (fetchData.data.results !== 0) {
          setData(fetchData.data.projects);
        }
      }
    }
  }
  useEffect(() => {
    getAllProjects();
  }, [deleteRender]);
  return (
    <div>
      {userRole === 'mentor' || userRole === 'employee' ? (
        <div className={styles.container}>
          <div className={styles.top}>
            <h2 className={styles.heading}>
              Total Projects {data && data.length}
            </h2>
            {userRole === 'mentor' ? (
              <Link to="add-new-project">
                <Button name="Add New Project" className="model"></Button>{' '}
              </Link>
            ) : (
              ''
            )}
          </div>
          <div className={styles.bottom} id={deleteRender+'jdfl'}>
            <ProjectCard data={data}></ProjectCard>
          </div>
        </div>
      ) : (
        <div>Please Login to Access this</div>
      )}
    </div>
  );
}

export default Projects;
