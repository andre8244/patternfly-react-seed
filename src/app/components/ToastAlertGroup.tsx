import React from 'react';
import { Alert, AlertGroup, AlertActionCloseButton, AlertVariant, InputGroup } from '@patternfly/react-core';
import { useAppSelector, useAppDispatch } from '@app/store/hooks';
import { selectNotifications, create } from '@app/store/features/notification/notificationSlice';

export function ToastAlertGroup() {
  const notifications = useAppSelector(selectNotifications);
  const dispatch = useAppDispatch();

  const btnClasses = ['pf-c-button', 'pf-m-secondary'].join(' ');
  const getUniqueId = () => (new Date().getTime());

  const addSuccessAlert = () => { dispatch(create({ title: 'Toast Success Alert', type: 'success', id: getUniqueId() })) };
  const addDangerAlert = () => { dispatch(create({ title: 'Toast Danger Alert', type: 'danger', id: getUniqueId() })) };
  const addInfoAlert = () => { dispatch(create({ title: 'Toast Info Alert', type: 'info', id: getUniqueId() })) };

  return (
    <React.Fragment>
      <InputGroup style={{ marginBottom: '16px' }}>
        <button onClick={addSuccessAlert} type="button" className={btnClasses}>Add Toast Success Alert</button>
        <button onClick={addDangerAlert} type="button" className={btnClasses}>Add Toast Danger Alert</button>
        <button onClick={addInfoAlert} type="button" className={btnClasses}>Add Toast Info Alert</button>
      </InputGroup>
      <AlertGroup isToast>
        {notifications.map(({ id, type, title }) => (
          <Alert
            isLiveRegion
            variant={AlertVariant[type]}
            title={title}
            actionClose={
              <AlertActionCloseButton
                title={title}
                variantLabel={`${type} alert`}
              // onClose={() => this.removeAlert(key)}
              />
            }
            key={new Date().getTime()} />
        ))}
      </AlertGroup>
    </React.Fragment>
  );
}
