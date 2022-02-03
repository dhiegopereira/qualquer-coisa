import React, { useState, useEffect } from 'react';
import LeftBarWorkers from '../../components/LeftBarWorkers';
import { Body, StyledContainer, BodyContainer } from './styles';
import WorkerCard from '../../components/WorkerCard';
import firebase from 'firebase';
import Skeleton from '@material-ui/lab/Skeleton';
import VisualFeedback from '../../components/VisualFeedback';

export default function Workers(props) {
  const [progress, setProgress] = useState(false);
  const [allStudents, setAllStudents] = useState([]);
  const [all, setAll] = useState(false);
  const [frontend, setFrontend] = useState(false);
  const [backend, setBackend] = useState(false);
  const [fullstack, setFullstack] = useState(false);

  const loadMyStudents = () => {
    setProgress(true);

    async function fetchData() {
      const db = firebase.firestore();

      const studentsRef = db.collection('users').orderBy('name');

      const students = [];
      const filter = all
        ? false
        : frontend
        ? 'Frontend Developer'
        : backend
        ? 'Backend Developer'
        : fullstack && 'Fullstack Developer';
      if (filter) {
        studentsRef
          .where('jobRole', '==', filter)
          .where('userType', '==', 'student')
          .where('isRecruiter', '==', false)
          .where('publicProfile', '==', false)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const {
                id,
                name,
                jobRole,
                profileImage,
                city,
                state,
                email,
                cellphone,
                skills,
                professionalExperience,
                aboutMe,
              } = doc.data();

              const studentObject = {
                id,
                name,
                jobRole,
                profileImage,
                city,
                state,
                email,
                cellphone,
                skills,
                professionalExperience,
                aboutMe,
              };
              students.push(studentObject);
            });

            setAllStudents(students);
            setProgress(false);
          })
          .catch(function (error) {
            console.log('Error getting documents: ', error);
          });
      } else {
        studentsRef
          .where('userType', '==', 'student')
          .where('isRecruiter', '==', false)
          .where('publicProfile', '==', false)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const {
                id,
                name,
                jobRole,
                profileImage,
                city,
                state,
                email,
                cellphone,
                skills,
                professionalExperience,
                aboutMe,
              } = doc.data();

              const studentObject = {
                id,
                name,
                jobRole,
                profileImage,
                city,
                state,
                email,
                cellphone,
                skills,
                professionalExperience,
                aboutMe,
              };
              students.push(studentObject);
            });

            setAllStudents(students);
            setProgress(false);
          })
          .catch(function (error) {
            console.log('Error getting documents: ', error);
          });
      }
    }

    fetchData();
  };

  useEffect(() => {
    loadMyStudents();
    return () => {
      setAllStudents('');
    };
  }, []);

  const applyFilters = () => {
    loadMyStudents();
  };

  return (
    <>
      <StyledContainer>
        <LeftBarWorkers
          backend={() => {
            setFrontend(false);
            setBackend(true);
            setFullstack(false);
            setAll(false);
          }}
          frontend={() => {
            setFrontend(true);
            setBackend(false);
            setFullstack(false);
            setAll(false);
          }}
          fullstack={() => {
            setFrontend(false);
            setBackend(false);
            setFullstack(true);
            setAll(false);
          }}
          all={() => {
            setFrontend(false);
            setBackend(false);
            setFullstack(false);
            setAll(true);
          }}
          applyFilters={applyFilters}
        />
        <BodyContainer maxWidth="lg">
          <Body container spacing={4}>
            {progress ? (
              <>
                <div style={{ margin: 10 }}>
                  <Skeleton variant="rect" width={200} height={250} />
                </div>
                <div style={{ margin: 10 }}>
                  <Skeleton variant="rect" width={200} height={250} />
                </div>
                <div style={{ margin: 10 }}>
                  <Skeleton variant="rect" width={200} height={250} />
                </div>
                <div style={{ margin: 10 }}>
                  <Skeleton variant="rect" width={200} height={250} />
                </div>
                <div style={{ margin: 10 }}>
                  <Skeleton variant="rect" width={200} height={250} />
                </div>
                <div style={{ margin: 10 }}>
                  <Skeleton variant="rect" width={200} height={250} />
                </div>
                <div style={{ margin: 10 }}>
                  <Skeleton variant="rect" width={200} height={250} />
                </div>
                <div style={{ margin: 10 }}>
                  <Skeleton variant="rect" width={200} height={250} />
                </div>
              </>
            ) : allStudents.length > 0 ? (
              allStudents?.map((student) => (
                <WorkerCard
                  key={student.id}
                  name={student?.name}
                  profileImage={student?.profileImage}
                  jobRole={student?.jobRole}
                  state={student?.state}
                  city={student?.city}
                  email={student?.email}
                  cellphone={student?.cellphone}
                  aboutMe={student?.aboutMe}
                  skills={student?.skills}
                  professionalExperience={student?.professionalExperience}
                  history={props.history}
                />
              ))
            ) : (
              <div style={{ marginTop: 40 }}>
                <VisualFeedback
                  description={'Não foi encontrado nenhum programador'}
                  subDescription={'Mude os filtros para ver outras opções'}
                />
              </div>
            )}
          </Body>
        </BodyContainer>
      </StyledContainer>
    </>
  );
}
