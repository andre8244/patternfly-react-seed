import * as React from 'react';
import {
  PageSection,
  Title,
  Spinner,
  Button,
  EmptyState,
  EmptyStateIcon,
  EmptyStateBody,
} from '@patternfly/react-core';
import { UsersIcon } from '@patternfly/react-icons';
import { H1 } from '@app/components/H1';
import { UserList } from '@app/Users/UserList';
import { CreateUserModal } from '@app/Users/CreateUserModal';
import { get } from '@app/utils/api';
import to from 'await-to-js';

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
      isModalOpen: false,
    };

    this.handleModalToggle = () => {
      this.setState(({ isModalOpen }) => ({
        isModalOpen: !isModalOpen
      }));
    };
  }

  async componentDidMount() {
    console.log("Mount");

    const [err, response] = await to(get(`https://reqres.in/api/users?delay=2`));
    if (err) {
      console.error("err", err) ////
      return;
    }

    console.log("users", response.data.data) ////

    this.setState({
      // users: [] ////
      users: response.data.data ////
    });
  }

  componentWillUnmount() {
    console.log("Unmount");
  }

  render() {
    const { isModalOpen } = this.state; ////

    let users;

    if (this.state.users == null) {
      users = <Spinner />
    } else if (!this.state.users.length) {
      // no users
      users =
        <EmptyState>
          <EmptyStateIcon icon={UsersIcon} />
          <Title headingLevel="h1" size="lg">
            No user
          </Title>
          <EmptyStateBody>
            Cluster has no user. You can create one by clicking the following button
          </EmptyStateBody>
          <Button variant="primary" onClick={this.handleModalToggle}>Create user</Button>
        </EmptyState>;
    } else {
      users = <UserList users={this.state.users} />;
    }

    return (
      <PageSection>
        <H1>
          Users
        </H1>
        <div className="mg-bottom-sm">
          <Button variant="primary" onClick={this.handleModalToggle}>Create user</Button>
        </div>
        {users}
        <CreateUserModal isOpen={isModalOpen} onToggle={this.handleModalToggle}/>
      </PageSection>
    );
  }
}

export { Users };
