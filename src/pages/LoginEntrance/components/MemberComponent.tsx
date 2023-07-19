import React, { Dispatch, SetStateAction } from 'react';

import Button from 'components/atomComponents/Button';
import Text from 'components/atomComponents/Text';
import TextInput from 'components/atomComponents/TextInput';
import Header from 'components/moleculesComponents/Header';
import TitleComponent from 'components/moleculesComponents/TitleComponents';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import { theme } from 'styles/theme';

interface HostInfoProps {
  name: string;
  password: string;
}
interface HostProps {
  hostInfo: HostInfoProps;
  setHostInfo: Dispatch<SetStateAction<HostInfoProps>>;
}
function MemberComponent({ hostInfo, setHostInfo }: HostProps) {
  const { meetingId } = useParams();
  const navigate = useNavigate();

  const hostOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHostInfo((prev: HostInfoProps) => {
      return { ...prev, name: e.target.value };
    });
  };

  const resetHostId = () => {
    setHostInfo((prev: HostInfoProps) => {
      return { ...prev, name: '' };
    });
  };

  const loginMember = () => {
    navigate(`/priority/${meetingId}`);
  };

  return (
    <>
      <Header position={'login'} />
      <TitleComponent
        main={'참여자의 이름을 알려주세요'}
        sub={'정확한 일정 조율을 위해 실명입력을 추천드려요'}
      />
      <HostInfoSection>
        <HostNameSection>
          <Text font={`title2`} color={`${theme.colors.white}`}>
            방장 이름
          </Text>
          <TextInput
            value={hostInfo.name}
            setValue={hostOnChange}
            resetValue={resetHostId}
            placeholder={'방장 이름'}
          />
        </HostNameSection>
      </HostInfoSection>
      <StyledBtnSection>
        <Button
          typeState={hostInfo.name ? 'primaryActive' : 'secondaryDisabled'}
          onClick={hostInfo.name ? loginMember : undefined}
        >
          <Text font={'button2'}>나의 가능 시간 입력</Text>
        </Button>
      </StyledBtnSection>
    </>
  );
}

export default MemberComponent;

const StyledBtnSection = styled.section`
  position: fixed;
  bottom: 1.2rem;
  border-radius: 50%;
`;

const HostNameSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const HostInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.4rem;
`;
