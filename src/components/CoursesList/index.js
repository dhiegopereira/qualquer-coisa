import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { MdAddShoppingCart, MdMovie } from 'react-icons/md';
import VisualFeedback from '../../components/VisualFeedback';
import { customizations } from '../../configs/customizations';
import { istAuthenticated } from '../../services/auth';
import { format } from '../../util/format';
import { addToCart } from '../../util/utils';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: 280,
    margin: 5,
    padding: 0,
    boxShadow: '0px 0px 0px black, 0 0 10px #282a36, 0 0 1px #282a36 ;',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  rootMyCourses: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 250,
    margin: 5,
    padding: 0,
    boxShadow: '0px 0px 0px black, 0 0 10px #282a36, 0 0 1px #282a36 ;',

    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  media: {
    height: '100px',
    width: '100%',
    paddingTop: '46.25%', // 16:9
  },
  expand: {
    textAlign: 'center',
    margin: '0px 0px 0px 15px',
    padding: '0px 0px 0px 15px',
  },
  avatar: {
    backgroundColor: red[500],
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  skeleton: {
    margin: '10px',
  },
}));

const CoursesList = (props) => {
  const classes = useStyles();
  const [coursesData, setCoursesData] = useState([]);
  const [progress, setProgress] = useState(false);

  const loadDataCourses = () => {
    setProgress(true);

    const myCourses = JSON.parse(localStorage?.getItem('myCourses'));

    async function fetchData() {
      const db = firebase.firestore();

      const coursesRef = db.collection('courses').orderBy('price', 'desc');

      await coursesRef
        .get()
        .then((querySnapshot) => {
          const courses = [];
          querySnapshot.forEach((doc) => {
            if (!props.buy) {
              if (myCourses) {
                if (myCourses.includes(doc.data().id)) {
                  courses.push(doc.data());
                }
              }
            } else {
              if (doc.data().enable) {
                courses.push(doc.data());
              }
            }
          });
          setCoursesData(courses);
          setProgress(false);
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error);
        });
    }

    fetchData();
  };

  const handleBuyCourse = (course) => {
    addToCart(course, props, true);
    if (!istAuthenticated()) {
      props.history.push('/sign-in', { idCourseFree: 0, toCart: true });
      return;
    }
  };

  const handleStartFreeCourse = (idCourseFree) => {
    if (!istAuthenticated()) {
      props.history.push('/sign-in', { idCourseFree, toCart: false });
      return;
    }
    props.history.push('/register-course', { idCourseFree, toCart: false });
  };

  const handleRedirectAllClasses = (id) => {
    props.history.push('/classes-by-course', { id });
  };

  const handleOpenCourseDetail = (id) => {
    props.history.push('/course-details', { id });
  };

  const handleAddToCart = (course) => {
    addToCart(course, props, false);
  };

  useEffect(() => {
    loadDataCourses();

    return () => {
      setCoursesData('');
      setProgress('');
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {progress ? (
        <>
          <div className={classes.skeleton}>
            <Skeleton variant="rect" width={250} height={50} />
            <Skeleton variant="text" />
            <Skeleton variant="rect" width={250} height={250} />
            <Skeleton variant="text" height={50} />
          </div>
          <div className={classes.skeleton}>
            <Skeleton variant="rect" width={250} height={50} />
            <Skeleton variant="text" />
            <Skeleton variant="rect" width={250} height={250} />
            <Skeleton variant="text" height={50} />
          </div>
          <div className={classes.skeleton}>
            <Skeleton variant="rect" width={250} height={50} />
            <Skeleton variant="text" />
            <Skeleton variant="rect" width={250} height={250} />
            <Skeleton variant="text" height={50} />
          </div>
          <div className={classes.skeleton}>
            <Skeleton variant="rect" width={250} height={50} />
            <Skeleton variant="text" />
            <Skeleton variant="rect" width={250} height={250} />
            <Skeleton variant="text" height={50} />
          </div>
        </>
      ) : coursesData?.length > 0 ? (
        coursesData.map((m) => (
          <Card
            className={props.buy ? classes.root : classes.rootMyCourses}
            key={m.id}
            style={{ cursor: 'pointer' }}
          >
            {props.buy ? (
              <CardMedia
                className={classes.media}
                image={m.image}
                title={m.title}
                style={{ cursor: 'pointer' }}
                onClick={() => handleOpenCourseDetail(m.id)}
              />
            ) : (
              <CardMedia
                className={classes.media}
                image={m.image}
                title={m.title}
                style={{ cursor: 'pointer' }}
                onClick={() => handleRedirectAllClasses(m.id)}
              />
            )}

            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}></Avatar>
              }
              title={m.name}
            />

            <CardContent
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                margin: 0,
              }}
            >
              {!props.buy ? (
                <div>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={() => handleRedirectAllClasses(m.id)}
                    style={{
                      backgroundColor: `${customizations?.secondaryColor}`,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                      }}
                    >
                      <MdMovie size={18} color="#fff" />
                      <p
                        style={{
                          margin: '0px 0px 0px 10px',
                          fontSize: 16,
                          fontWeight: 'bold',
                          color: '#fff',
                        }}
                      >
                        Assistir
                      </p>
                    </div>
                  </Button>
                </div>
              ) : (
                <>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    <b>Descrição: </b>
                    {m.shortDescription}
                  </Typography>
                </>
              )}
            </CardContent>
            {props.buy && (
              <CardActions disableSpacing>
                {m.price > 0 ? (
                  <>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      onClick={() => handleBuyCourse(m)}
                      style={{
                        backgroundColor: `${customizations?.secondaryColor}`,
                      }}
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
                            margin: '0px 0px 0px 10px',
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#fff',
                          }}
                        >
                          {format(m.price)}
                        </p>
                      </div>
                    </Button>
                    <Button
                      fullWidth
                      variant="contained"
                      style={{
                        backgroundColor: `${customizations?.secondaryColor}`,
                        margin: 5,
                      }}
                      onClick={() => handleAddToCart(m)}
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
                            margin: '0px 0px 0px 10px',
                            fontWeight: 'bold',
                            color: '#fff',
                            fontSize: 16,
                          }}
                        >
                          Carrinho
                        </p>
                      </div>
                    </Button>
                  </>
                ) : (
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleStartFreeCourse(m.id)}
                    style={{
                      backgroundColor: `${customizations?.secondaryColor}`,
                    }}
                  >
                    <p
                      style={{
                        margin: '0px 0px 0px 10px',
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#fff',
                      }}
                    >
                      CURSO GRÁTIS
                    </p>
                  </Button>
                )}
              </CardActions>
            )}
          </Card>
        ))
      ) : (
        <VisualFeedback
          description="Você ainda não tem cursos!"
          subDescription="volte para a loja e veja nossas opções!"
        />
      )}
    </>
  );
};

CoursesList.propTypes = {
  className: PropTypes.string,
};

export default CoursesList;
