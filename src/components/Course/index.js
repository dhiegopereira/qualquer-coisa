import Avatar from '@material-ui/core/Avatar';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { MdAddShoppingCart, MdMovie } from 'react-icons/md';
import { customizations } from '../../configs/customizations';
import { format } from '../../util/format';
import { addToCart, updateLocalStorageMyCourses } from '../../util/utils';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 450,
    width: 350,
    height: 300,
    margin: 5,
    padding: 0,
    boxShadow: '0px 0px 0px black, 0 0 10px #282a36, 0 0 1px #282a36 ;',
  },
  media: {
    height: 0,
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
}));

const CoursesList = (props) => {
  const classes = useStyles();
  const [courseData, setCourseData] = useState([]);
  const [progress, setProgress] = useState(false);

  const handleBuyCourse = (course) => {
    addToCart(course, props, true);
    props.history.push('/dashboard');
  };

  const loadDataCourses = () => {
    setProgress(true);

    async function fetchData() {
      const db = firebase.firestore();

      const coursesRef = db.collection('courses').doc(props.id);

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
    }

    fetchData();
  };

  const handleEnrrol = async () => {
    setProgress(true);
    const db = firebase.firestore();

    await db
      .collection('users')
      .doc(localStorage.getItem('user'))
      .update({
        myCourses: firebase.firestore.FieldValue.arrayUnion(courseData.id),
      })
      .then(() => {
        setProgress(false);
        updateLocalStorageMyCourses(props);
      });
  };

  useEffect(() => {
    loadDataCourses();
    // eslint-disable-next-line
  }, []);

  // const onBlur = () => {
  //   props.history.push('/dashboard');
  // };

  // useEffect(() => {
  //   window.addEventListener('blur', onBlur);
  //   return () => {
  //     window.removeEventListener('blur', onBlur);
  //     setCourseData('');
  //     // setProgress('');
  //   };
  //   // eslint-disable-next-line
  // });

  return (
    <>
      {progress && (
        <Backdrop className={classes.backdrop} open={progress}>
          <CircularProgress color="inherit" />
          <p style={{ fontSize: 18, marginLeft: 10 }}>Carregando...</p>
        </Backdrop>
      )}
      <Card className={classes.root} key={courseData.id}>
        <CardMedia
          className={classes.media}
          image={courseData.image}
          title={courseData.title}
        />

        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}></Avatar>
          }
          title={courseData.name}
        />

        <CardContent
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            margin: 0,
          }}
        >
          <div>
            {courseData.price > 0 ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={() => handleBuyCourse(courseData)}
                style={{
                  backgroundColor: `${customizations?.secondaryColor}`,
                  position: 'relative',
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
                    {format(courseData.price)}
                  </p>
                </div>
              </Button>
            ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={() => handleEnrrol(courseData.id)}
                  style={{
                    backgroundColor: `${customizations?.secondaryColor}`,
                    position: 'relative',
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
                      MATRICULAR
                  </p>
                  </div>
                </Button>
              )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

CoursesList.propTypes = {
  className: PropTypes.string,
};

export default CoursesList;
