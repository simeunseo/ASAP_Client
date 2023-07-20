import React, { Suspense, useEffect, useState } from 'react';

import { availableDatesAtom, preferTimesAtom, timeSlotUserNameAtom } from 'atoms/atom';
import Text from 'components/atomComponents/Text';
import ErrorPage404 from 'pages/ErrorLoading/ErrorPage404';
import LoadingPage from 'pages/ErrorLoading/LoadingPage';
import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { OverallScheduleData } from 'src/types/overallScheduleType';
import { styled } from 'styled-components';
import { theme } from 'styles/theme';
import { availableScheduleOptionApi } from 'utils/apis/availbleScheduleOptionApi';
import { overallScheduleApi } from 'utils/apis/overallScheduleApi';

import TimeTable from './components/TimeTable';
import { getFormattedAvailableDateTimes } from './utils/getFormattedAvailableDateTimes';


const OverallSchedule = () => {
  const { meetingId } = useParams();
  const [overallScheduleData, setOverallScheduleData] = useState<OverallScheduleData>();

  const [availableDates, setAvailableDates] = useRecoilState(availableDatesAtom);

  const [preferTimes, setPreferTimes] = useRecoilState(preferTimesAtom);

  const [timeSlotUserNames, setTimeSlotUserNames] = useRecoilState(timeSlotUserNameAtom);
  const getAvailableScheduleOption = async () => {
    try {
      const { data } = await availableScheduleOptionApi(meetingId);
      setAvailableDates(data.data.availableDates);
      setPreferTimes(data.data.preferTimes);
    } catch (err) {
      console.log(err);
    }
  };

  const getOverallSchedule = async () => {
    try {
      const result = await overallScheduleApi(meetingId);
      const { data } = result.data;
      setOverallScheduleData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAvailableScheduleOption();
    getOverallSchedule();
  }, []);

  // console.log(overallSchedule);
  const formattedAvailableDateTimes =
    overallScheduleData && getFormattedAvailableDateTimes(overallScheduleData);

  return (
    <OverallScheduleWrapper>
      {overallScheduleData ? (
        <>
          <UserNameWrapper>
            {!timeSlotUserNames ? (
              <Text font={'body4'} color={`${theme.colors.grey5}`}>
                블럭을 선택하면 해당 시간대에 참여가능한<br />인원을 확인할 수 있어요
              </Text>
            ) : (
              timeSlotUserNames.map((name, idx) => (
                <Text key={idx + name} font={'body2'} color={`${theme.colors.grey2}`}>
                  {name}
                  {idx !== timeSlotUserNames.length - 1 ? ',' : ''}&nbsp;
                </Text>
              ))
            )}
          </UserNameWrapper>
          <TimeTable
            selectedSchedule={formattedAvailableDateTimes?.availableDateTimes}
            availableDates={availableDates}
            preferTimes={preferTimes}
            scheduleType="available"
          />
        </>
      ) : (
        <LoadingPage />
      )}
    </OverallScheduleWrapper>
  );
};

export default OverallSchedule;

const UserNameWrapper = styled.aside`
  display: flex;
  position: fixed;
  bottom: 4.4rem;
  flex-wrap: wrap;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.grey5};
  border-radius: 0.8rem;
  background: ${({ theme }) => theme.colors.grey9};
  width: 33.5rem;
  min-height: 8.3rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
`;

const OverallScheduleWrapper = styled.main`
  margin-bottom: 16.1rem;
`;
