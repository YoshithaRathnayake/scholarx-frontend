import React from 'react';
import { getStateColor } from '../../utils';
import { useParams } from 'react-router-dom';
import useMentor from '../../hooks/admin/useMentor';
import Toast from '../Toast';

const MentorApplication: React.FC = () => {
  const { mentorId } = useParams();
  const {
    isFetching,
    data: mentor,
    changeState,
    isSuccess,
    isPending,
    isError,
  } = useMentor(mentorId);
  const handleStateChange = (newState: string) => {
    changeState(newState);
  };

  return (
    <>
      {isSuccess && (
        <Toast message={'Status updated successfully'} type={'success'} />
      )}
      {isError && (
        <Toast message={'Oops something went wrong'} type={'error'} />
      )}
      {isFetching ? (
        <div>Loading</div>
      ) : (
        <div className="w-full space-y-8">
          <div className="flex items-center">
            <img
              src={mentor?.profile.image_url}
              alt=""
              className="w-24 h-24 rounded-full object-fill"
            />
            <div className="ml-5">
              <div className="flex items-center space-x-3">
                <span className="text-2xl font-semibold">
                  {mentor?.application.firstName} {mentor?.application.lastName}
                </span>
                <span
                  className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-sm ${getStateColor(
                    mentor?.state
                  )}`}
                >
                  {mentor?.state}
                </span>
              </div>
              <span className="text-xl font-light">
                {mentor?.application.position},{' '}
                {mentor?.application.institution}
              </span>
            </div>
            <div className="ml-auto flex overflow-hidden">
              <button
                className="inline-block rounded border px-10 py-2 my-2 mx-2 text-sm font-medium text-primary-blue border-primary-blue focus:outline-none focus:ring"
                onClick={() => {
                  handleStateChange('approved');
                }}
              >
                {isPending ? 'Loading...' : 'Approve'}
              </button>
              <button
                className="inline-block rounded border px-10 py-2 my-2 mx-2 text-sm font-medium text-red-500 border-red-500 focus:outline-none focus:ring"
                onClick={() => {
                  handleStateChange('rejected');
                }}
              >
                {isPending ? 'Loading...' : 'Reject'}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-10">
            <div className="col-span-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-base font-bold">No of Mentees</h3>
                  <p>{mentor?.application.noOfMentees}</p>
                </div>
                <div>
                  <h3 className="text-base font-bold">Category</h3>
                  <p>{mentor?.category.category}</p>
                </div>
                <div>
                  <h3 className="text-base font-bold">Country</h3>
                  <p>{mentor?.application.country}</p>
                </div>
                <div>
                  <h3 className="text-base font-bold">Expertise</h3>
                  <p>{mentor?.application.expertise}</p>
                </div>
                <div>
                  <h3 className="text-base font-bold">Past Mentor</h3>
                  <p>{mentor?.application.isPastMentor ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <h3 className="text-base font-bold">Mentored Year</h3>
                  <p>{mentor?.application.mentoredYear}</p>
                </div>
              </div>
            </div>
            <div className="col-span-2 pl-8 border-l">
              <div className="grid grid-cols-2 gap-1">
                <a
                  href={mentor?.application.linkedin}
                  target="_blank"
                  className="underline mb-2"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  href={mentor?.application.website}
                  target="_blank"
                  className="underline mb-2"
                  rel="noreferrer"
                >
                  Website
                </a>
                <a
                  href={mentor?.application.cv}
                  target="_blank"
                  rel="noreferrer"
                  className="underline mb-2"
                >
                  CV
                </a>
              </div>
            </div>
            <div className="col-span-5">
              <div className="mb-4">
                <h3 className="text-base font-bold">Mentee Expectations</h3>
                <p>{mentor?.application.menteeExpectations}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-base font-bold">Mentoring Philosophy</h3>
                <p>{mentor?.application.mentoringPhilosophy}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-base font-bold">Reason to Mentor</h3>
                <p>{mentor?.application.reasonToMentor}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-base font-bold">Bio</h3>
                <p>{mentor?.application.bio}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MentorApplication;
