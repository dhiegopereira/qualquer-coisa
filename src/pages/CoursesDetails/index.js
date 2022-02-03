import firebase from 'firebase';
import React, { useEffect, useRef, useState } from 'react';
import ModalWithMedia from '../../components/ModalWithMedia';
import ResponsiveNavbar from '../../components/ResponsiveNavbar';
import { istAuthenticated } from '../../services/auth';
import { addToCart } from '../../util/utils';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Skeleton from '@material-ui/lab/Skeleton';
import {
  Container,
  Header,
  LeftHeader,
  RightHeader,
  StyledButton,
  StyledTable,
} from './styles';
import { format } from '../../util/format';

import {
  MdAddShoppingCart,
  MdPlayCircleFilled,
  MdShoppingCart,
} from 'react-icons/md';

export default function CoursesDetails(props) {
  const [classesData, setClassesData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [progress, setProgress] = useState(false);
  const [open, setOpen] = useState(false);
  const [urlClasse, setUrlClasse] = useState('');
  const [titleClasse, setTitleClasse] = useState('');
  const playerRef = useRef();

  const handleStartFreeCourse = (idCourseFree) => {
    if (!istAuthenticated()) {
      props.history.push('/sign-in', { idCourseFree });
      return;
    }
    props.history.push('/register-course', { idCourseFree });
  };

  const handleClickOpen = (urlVideo, titleClasse) => {
    setUrlClasse(urlVideo);
    setTitleClasse(titleClasse);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBuyCourse = (course) => {
    addToCart(course, props, true);
    if (!istAuthenticated()) {
      props.history.push('/sign-in', { idCourseFree: 0, toCart: true });
      return;
    }
  };

  const loadDataCourse = async () => {
    setProgress(true);

    if (!props.history.location.state) {
      return props.history.push('/dashboard');
    }

    const { id } = props.history.location.state;

    const db = firebase.firestore();

    const coursesRef = db.collection('courses').doc(id);

    await coursesRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setCourseData(doc.data());

          setProgress(false);
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
      });

    const classesRef = db
      .collection(`courses/${id}/classes`)
      .orderBy('position');

    await classesRef
      .get()
      .then((querySnapshot) => {
        const classes = [];
        querySnapshot.forEach((doc) => {
          classes.push(doc.data());
        });

        setClassesData(classes);
        setProgress(false);
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
      });
  };

  useEffect(() => {
    loadDataCourse();
    return () => {
      setCourseData([]);
      setClassesData([]);
    };

    //eslint-disable-next-line
  }, []);

  return (
    <>
      <ResponsiveNavbar history={props?.history} />

      <ModalWithMedia
        open={open}
        handleClose={handleClose}
        url={urlClasse}
        title={titleClasse}
      />

      <Container>
        <Header background={courseData.image}>
          <LeftHeader>
            {progress ? (
              <>
                <Skeleton variant="rect" width={250} height={20} />
                <Skeleton variant="rect" width={250} height={20} />
                <Skeleton variant="rect" width={250} height={20} />
                <Skeleton variant="rect" width={250} height={20} />
                <Skeleton variant="rect" width={250} height={20} />
                <Skeleton variant="rect" width={250} height={20} />
              </>
            ) : (
              <>
                <h1>{courseData.name}</h1>
                <span>{courseData.description}</span>
                <strong>{courseData.length > 0} Aula (s)</strong>
                <strong>{courseData.duration} Hora (s)</strong>
              </>
            )}
          </LeftHeader>
          <RightHeader>
            {progress ? (
              <Skeleton variant="rect" width={250} height={150} />
            ) : (
              <img src={courseData.image} alt="image" />
            )}
            {courseData.price > 0 ? (
              <>
                <input
                  type="hidden"
                  name="code"
                  value={courseData.codePayment}
                />
                <input type="hidden" name="iot" value="button" />
                <StyledButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={() => handleBuyCourse(courseData)}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}
                  >
                    <MdAddShoppingCart size={18} color="#fff" />
                    <p
                      style={{
                        margin: '0px',
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#fff',
                      }}
                    >
                      {format(courseData.price)}
                    </p>
                  </div>
                </StyledButton>
              </>
            ) : (
              <StyledButton
                fullWidth
                variant="contained"
                onClick={() => handleStartFreeCourse(courseData.id)}
              >
                <p
                  style={{
                    margin: '0px',
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#fff',
                  }}
                >
                  INSCREVA-SE GRÁTIS
                </p>
              </StyledButton>
            )}
          </RightHeader>
        </Header>
        <StyledTable component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Aula</b>
                </TableCell>
                <TableCell align="center">
                  <b>Nome da Aula</b>
                </TableCell>
                <TableCell align="center">
                  <b>Duração</b>
                </TableCell>
                <TableCell align="right">
                  <b></b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {classesData.map((classe) => (
                <TableRow key={classe.id}>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ minWidth: 100 }}
                  >
                    {classe.position}
                  </TableCell>
                  <TableCell align="center" style={{ textAlign: 'center' }}>
                    {classe.title}
                  </TableCell>
                  <TableCell align="center" style={{ textAlign: 'center' }}>
                    {classe.duration} Min.
                  </TableCell>
                  <Tooltip
                    title={
                      classe?.open ? 'Assista gratuitamente' : 'Aula privada'
                    }
                  >
                    <TableCell
                      align="center"
                      style={{
                        textAlign: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      {classe?.open ? (
                        <MdPlayCircleFilled
                          size={25}
                          onClick={() =>
                            handleClickOpen(classe?.url_video, classe?.title)
                          }
                        ></MdPlayCircleFilled>
                      ) : (
                        <MdShoppingCart
                          size={25}
                          onClick={() => handleStartFreeCourse(courseData.id)}
                        />
                      )}
                    </TableCell>
                  </Tooltip>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTable>
      </Container>
    </>
  );
}
