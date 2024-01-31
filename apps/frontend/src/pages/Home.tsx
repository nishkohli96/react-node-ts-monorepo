import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Button from '@mui/material/Button';
import { fetchBankInfo, useAppSelector, useAppDispatch } from 'redux-store';
import { TextWithBadge } from '@core/lib';

const Page1: FC = () => {
  const navigate = useNavigate();
  const bankInfo = useAppSelector((state) => state.bank.bankInfo);
  const dispatch = useAppDispatch();

  const { REACT_APP_TESTVAR } = process.env;

  return (
    <div className="root">
      <div style={{ margin: '10px 0px' }}>hi from Page1. Edit the code</div>
      <div style={{ margin: '10px 0px' }}>
        <p>
          This component exported from <b>@core/lib</b>
        </p>
        <TextWithBadge text="Sample Badge Text" badgeVal={5} />
      </div>
      <Button variant="outlined" onClick={() => navigate('/page-2')}>
        Go to Page2
      </Button>
      <Button onClick={() => dispatch(fetchBankInfo({ ifsc: 'KARB0000001' }))}>
        Get Bank Info
      </Button>
      <div>Fetched Bank Info: {JSON.stringify(bankInfo)}</div>
    </div>
  );
};

export default observer(Page1);
