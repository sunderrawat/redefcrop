import Button from '../Button';
import useAlertRender from '../../hooks/useAlertRender';
import { useDispatch } from 'react-redux';
import getData from '../../utils/getData';
import { renderActions } from '../../store/render';
function DeleteProject(props) {
  const dispatch = useDispatch();
  const { alertRender } = useAlertRender();
  const deleteHandler = async () => {
    console.log('delete clicked');
    const response = await getData(`/projects/${props.id}`, 'DELETE');

    if (response === 'error') {
      return alertRender('error', 'Invalid operation');
    }
    alertRender('success', 'Project Deleted Success');
    dispatch(renderActions.deleteRender());
    // console.log(response);
  };
  return (
    <Button
      name="Delete"
      onClick={deleteHandler}
      className="model"
      type="danger"
    ></Button>
  );
}

export default DeleteProject;
