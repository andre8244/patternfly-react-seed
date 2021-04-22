import React from 'react';
import {
  Button,
  DataList,
  DataListActionModifiers,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
  DataListCell,
  DataListAction,
  Dropdown,
  DropdownItem,
  DropdownPosition,
  KebabToggle,
  Avatar
} from '@patternfly/react-core';

class UserList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const users = this.props.users.map((user) =>
      <DataListItem key={user.id} aria-labelledby="check-action-item1">
        <DataListItemRow>
          <DataListItemCells
            dataListCells={[
              <DataListCell key="primary content">
                <Avatar src={user.avatar} alt="avatar" />
              </DataListCell>,
              <DataListCell key="secondary content 1">
                {user.first_name} {user.last_name}
              </DataListCell>,
              <DataListCell key="secondary content 2">
                {user.email}
              </DataListCell>,
            ]}
          />
          <DataListAction
            aria-labelledby="check-action-item1 check-action-action1"
            id="check-action-action1"
            aria-label="Actions"
            isPlainButtonAction
          >
            <Dropdown
              isPlain
              position={DropdownPosition.right}
              isOpen={false}
              toggle={<KebabToggle />}
              dropdownItems={[
                <DropdownItem key="link">Link</DropdownItem>,
                <DropdownItem key="action" component="button">
                  Action
            </DropdownItem>,
                <DropdownItem key="disabled link" isDisabled>
                  Disabled Link
            </DropdownItem>
              ]}
            />
          </DataListAction>
        </DataListItemRow>
      </DataListItem>
    );

    return (
      <DataList aria-label="Checkbox and action data list example">
        {users}
      </DataList>
    );
  }
}

export { UserList };
