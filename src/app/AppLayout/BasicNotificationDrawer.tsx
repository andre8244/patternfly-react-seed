import React from 'react';
import {
  Avatar,
  Brand,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonVariant,
  Card,
  CardBody,
  Drawer,
  DrawerContent,
  DrawerContentBody,
  DropdownPosition,
  DropdownDirection,
  Dropdown,
  DropdownGroup,
  DropdownToggle,
  DropdownItem,
  DropdownSeparator,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStatePrimary,
  Gallery,
  GalleryItem,
  KebabToggle,
  Nav,
  NavItem,
  NavList,
  NotificationBadge,
  NotificationDrawer,
  NotificationDrawerBody,
  NotificationDrawerHeader,
  NotificationDrawerList,
  NotificationDrawerListItem,
  NotificationDrawerListItemBody,
  NotificationDrawerListItemHeader,
  Page,
  PageHeader,
  PageSection,
  PageSectionVariants,
  PageSidebar,
  SkipToContent,
  TextContent,
  Text,
  Title,
  PageHeaderTools,
  PageHeaderToolsGroup,
  PageHeaderToolsItem
} from '@patternfly/react-core';
import { css } from '@patternfly/react-styles';
import BellIcon from '@patternfly/react-icons/dist/js/icons/bell-icon';
import CogIcon from '@patternfly/react-icons/dist/js/icons/cog-icon';
import HelpIcon from '@patternfly/react-icons/dist/js/icons/help-icon';
import imgBrand from '@patternfly/react-core/src/components/Brand/examples/pfLogo.svg';
import imgAvatar from '@patternfly/react-core/src/components/Avatar/examples/avatarImg.svg';
import { Table, TableHeader, TableBody } from '@patternfly/react-table';

class BasicNotificationDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownOpen: false,
      isKebabDropdownOpen: false,
      activeItem: 0,
      isDrawerExpanded: false,
      isUnreadMap: {
        "notification-1": true,
        "notification-2": true
      },
      showNotifications: true,
      isActionsMenuOpen: null
    };
    this.onDropdownToggle = isDropdownOpen => {
      this.setState({
        isDropdownOpen
      });
    };

    this.onDropdownSelect = event => {
      this.setState({
        isDropdownOpen: !this.state.isDropdownOpen
      });
    };

    this.onKebabDropdownToggle = isKebabDropdownOpen => {
      this.setState({
        isKebabDropdownOpen
      });
    };

    this.onKebabDropdownSelect = event => {
      this.setState({
        isKebabDropdownOpen: !this.state.isKebabDropdownOpen
      });
    };

    this.onNavSelect = result => {
      this.setState({
        activeItem: result.itemId
      });
    };

    this.onCloseNotificationDrawer = () => {
      this.setState(prevState => {
        return {
          isDrawerExpanded: !prevState.isDrawerExpanded
        }
      });
    };

    this.onToggle = (id, isOpen) => {
      this.setState({
        isActionsMenuOpen: { [id]: isOpen }
      });
    };

    this.onSelect = event => {
      this.setState({
        isActionsMenuOpen: null
      });
    };

    this.onListItemClick = (id) => {
      this.setState(prevState => {
        if (!prevState.isUnreadMap) return;
        prevState.isUnreadMap[id] = false;
        return {
          isUnreadMap: prevState.isUnreadMap
        }
      });
    }

    this.getNumberUnread = () => {
      const { isUnreadMap } = this.state
      if (isUnreadMap === null) return 0;
      return Object.keys(isUnreadMap).reduce((count, id) => {
        return isUnreadMap[id] ? count + 1 : count;
      }, 0);
    }

    this.markAllRead = () => {
      this.setState({
        isUnreadMap: null
      });
    }

    this.showNotifications = (showNotifications) => {
      this.setState({
        isUnreadMap: null,
        showNotifications: showNotifications
      });
    }
  }

  render() {
    const {
      isDropdownOpen,
      isKebabDropdownOpen,
      activeItem,
      res,
      isDrawerExpanded,
      isActionsMenuOpen,
      isUnreadMap,
      showNotifications
    } = this.state;

    const PageNav = (
      <Nav onSelect={this.onNavSelect} aria-label="Nav">
        <NavList>
          <NavItem itemId={0} isActive={activeItem === 0}>
            System Panel
          </NavItem>
          <NavItem itemId={1} isActive={activeItem === 1}>
            Policy
          </NavItem>
          <NavItem itemId={2} isActive={activeItem === 2}>
            Authentication
          </NavItem>
          <NavItem itemId={3} isActive={activeItem === 3}>
            Network Services
          </NavItem>
          <NavItem itemId={4} isActive={activeItem === 4}>
            Server
          </NavItem>
        </NavList>
      </Nav>
    );
    const kebabDropdownItems = [
      <DropdownItem>
        <CogIcon /> Settings
      </DropdownItem>,
      <DropdownItem>
        <HelpIcon /> Help
      </DropdownItem>
    ];
    const userDropdownItems = [
      <DropdownGroup key="group 2">
        <DropdownItem key="group 2 profile">My profile</DropdownItem>
        <DropdownItem key="group 2 user" component="button">
          User management
        </DropdownItem>
        <DropdownItem key="group 2 logout">Logout</DropdownItem>
      </DropdownGroup>
    ];
    const headerTools = (
      <PageHeaderTools>
        <PageHeaderToolsItem visibility={{default: 'visible'}} isSelected={isDrawerExpanded}>
          <NotificationBadge variant={this.getNumberUnread() === 0 ? 'read' : 'unread'} onClick={this.onCloseNotificationDrawer} aria-label="Notifications">
            <BellIcon />
          </NotificationBadge>
        </PageHeaderToolsItem>
        <PageHeaderToolsGroup
          visibility={{
            default: 'hidden',
            lg: 'visible'
          }} /** the settings and help icon buttons are only visible on desktop sizes and replaced by a kebab dropdown for other sizes */
        >
          <PageHeaderToolsItem>
            <Button aria-label="Settings actions" variant={ButtonVariant.plain}>
              <CogIcon />
            </Button>
          </PageHeaderToolsItem>
          <PageHeaderToolsItem>
            <Button aria-label="Help actions" variant={ButtonVariant.plain}>
              <HelpIcon />
            </Button>
          </PageHeaderToolsItem>
        </PageHeaderToolsGroup>
        <PageHeaderToolsGroup>
          <PageHeaderToolsItem
            visibility={{
              lg: 'hidden'
            }} /** this kebab dropdown replaces the icon buttons and is hidden for desktop sizes */
          >
            <Dropdown
              isPlain
              position="right"
              onSelect={this.onKebabDropdownSelect}
              toggle={<KebabToggle onToggle={this.onKebabDropdownToggle} />}
              isOpen={isKebabDropdownOpen}
              dropdownItems={kebabDropdownItems}
            />
          </PageHeaderToolsItem>
          <PageHeaderToolsItem
            visibility={{ default: 'hidden', md: 'visible' }} /** this user dropdown is hidden on mobile sizes */
          >
            <Dropdown
              isPlain
              position="right"
              onSelect={this.onDropdownSelect}
              isOpen={isDropdownOpen}
              toggle={<DropdownToggle onToggle={this.onDropdownToggle}>John Smith</DropdownToggle>}
              dropdownItems={userDropdownItems}
            />
          </PageHeaderToolsItem>
        </PageHeaderToolsGroup>
        <Avatar src={imgAvatar} alt="Avatar image" />
      </PageHeaderTools>
    );

    const Header = (
      <PageHeader logo={<Brand src={imgBrand} alt="Patternfly Logo" />} headerTools={headerTools} showNavToggle />
    );
    const Sidebar = <PageSidebar nav={PageNav} />;
    const pageId = 'main-content-page-layout-default-nav';
    const PageSkipToContent = <SkipToContent href={`#${pageId}`}>Skip to content</SkipToContent>;

    const PageBreadcrumb = (
      <Breadcrumb>
        <BreadcrumbItem>Section home</BreadcrumbItem>
        <BreadcrumbItem to="#">Section title</BreadcrumbItem>
        <BreadcrumbItem to="#">Section title</BreadcrumbItem>
        <BreadcrumbItem to="#" isActive>
          Section landing
        </BreadcrumbItem>
      </Breadcrumb>
    );

    const drawerContent = "Panel content";

    const notificationDrawerActions = [
      <DropdownItem key="markAllRead" onClick={this.markAllRead} component="button">
        Mark all read
      </DropdownItem>,
      <DropdownItem key="clearAll" onClick={() => this.showNotifications(false)} component="button">
        Clear all
      </DropdownItem>,
      <DropdownItem key="unclearLast" onClick={() => this.showNotifications(true)}component="button">
        Unclear last
      </DropdownItem>,
      <DropdownItem key="settings" component="button">
        Settings
      </DropdownItem>,
    ];

    const notificationDrawerDropdownItems = [
      <DropdownItem key="link">Link</DropdownItem>,
      <DropdownItem key="action" component="button">
        Action
      </DropdownItem>,
      <DropdownSeparator key="separator" />,
      <DropdownItem key="disabled link" isDisabled>
        Disabled Link
      </DropdownItem>
    ];

    const notificationDrawer = (
      <NotificationDrawer>
        <NotificationDrawerHeader count={this.getNumberUnread()} onClose={this.onCloseNotificationDrawer}>
          <Dropdown
            onSelect={this.onSelect}
            toggle={<KebabToggle onToggle={isOpen => this.onToggle('toggle-id-0', isOpen)} id="toggle-id-0" />}
            isOpen={isActionsMenuOpen && isActionsMenuOpen['toggle-id-0']}
            isPlain
            dropdownItems={notificationDrawerActions}
            id="notification-0"
            position={DropdownPosition.right}
          />
        </NotificationDrawerHeader>
        <NotificationDrawerBody>
          {showNotifications && (
            <NotificationDrawerList>
              <NotificationDrawerListItem variant="info" onClick={() => this.onListItemClick("notification-1")} isRead={isUnreadMap === null || !isUnreadMap["notification-1"]}>
                <NotificationDrawerListItemHeader
                  variant="info"
                  title="Unread info notification title"
                  srTitle="Info notification:"
                >
                  <Dropdown
                    position={DropdownPosition.right}
                    onSelect={this.onSelect}
                    toggle={<KebabToggle onToggle={isOpen => this.onToggle('toggle-id-1', isOpen)} id="toggle-id-1" />}
                    isOpen={isActionsMenuOpen && isActionsMenuOpen['toggle-id-1']}
                    isPlain
                    dropdownItems={notificationDrawerDropdownItems}
                    id="notification-1"
                  />
                </NotificationDrawerListItemHeader>
                <NotificationDrawerListItemBody timestamp="5 minutes ago">
                  This is an info notification description.
                </NotificationDrawerListItemBody>
              </NotificationDrawerListItem>
              <NotificationDrawerListItem variant="danger" onClick={() => this.onListItemClick("notification-2")} isRead={isUnreadMap === null || !isUnreadMap["notification-2"]}>
                <NotificationDrawerListItemHeader
                  variant="danger"
                  title="Unread danger notification title. This is a long title to show how the title will wrap if it is long and wraps to multiple lines."
                  srTitle="Danger notification:"
                >
                  <Dropdown
                    position={DropdownPosition.right}
                    onSelect={this.onSelect}
                    toggle={<KebabToggle onToggle={isOpen => this.onToggle('toggle-id-2', isOpen)} id="toggle-id-2" />}
                    isOpen={isActionsMenuOpen && isActionsMenuOpen['toggle-id-2']}
                    isPlain
                    dropdownItems={notificationDrawerDropdownItems}
                    id="notification-2"
                  />
                </NotificationDrawerListItemHeader>
                <NotificationDrawerListItemBody timestamp="10 minutes ago">
                  This is a danger notification description. This is a long description to show how the title will wrap if
                  it is long and wraps to multiple lines.
                </NotificationDrawerListItemBody>
              </NotificationDrawerListItem>
              <NotificationDrawerListItem variant="warning" onClick={() => this.onListItemClick("notification-3")} isRead={isUnreadMap === null || !isUnreadMap["notification-3"]}>
                <NotificationDrawerListItemHeader
                  variant="warning"
                  title="Read warning notification title"
                  srTitle="Warning notification:"
                >
                  <Dropdown
                    position={DropdownPosition.right}
                    onSelect={this.onSelect}
                    toggle={<KebabToggle onToggle={isOpen => this.onToggle('toggle-id-3', isOpen)} id="toggle-id-3" />}
                    isOpen={isActionsMenuOpen && isActionsMenuOpen['toggle-id-3']}
                    isPlain
                    dropdownItems={notificationDrawerDropdownItems}
                    id="notification-3"
                  />
                </NotificationDrawerListItemHeader>
                <NotificationDrawerListItemBody timestamp="20 minutes ago">
                  This is a warning notification description.
                </NotificationDrawerListItemBody>
              </NotificationDrawerListItem>
              <NotificationDrawerListItem variant="success" onClick={() => this.onListItemClick("notification-4")} isRead={isUnreadMap === null || !isUnreadMap["notification-4"]}>
                <NotificationDrawerListItemHeader
                  variant="success"
                  title="Read success notification title"
                  srTitle="Success notification:"
                >
                  <Dropdown
                    position={DropdownPosition.right}
                    direction={DropdownDirection.up}
                    onSelect={this.onSelect}
                    toggle={<KebabToggle onToggle={isOpen => this.onToggle('toggle-id-4', isOpen)} id="toggle-id-4" />}
                    isOpen={isActionsMenuOpen && isActionsMenuOpen['toggle-id-4']}
                    isPlain
                    dropdownItems={notificationDrawerDropdownItems}
                    id="notification-4"
                  />
                </NotificationDrawerListItemHeader>
                <NotificationDrawerListItemBody timestamp="30 minutes ago">
                  This is a success notification description.
                </NotificationDrawerListItemBody>
              </NotificationDrawerListItem>
            </NotificationDrawerList>
          )}
          {!showNotifications && (
            <EmptyState variant={EmptyStateVariant.full}>
              <EmptyStateIcon icon={SearchIcon} />
              <Title headingLevel="h2" size="lg">
                No alerts found
              </Title>
              <EmptyStateBody>
                There are currently no alerts. There may be silenced critical alerts however.
              </EmptyStateBody>
              <EmptyStatePrimary>
                <Button variant="link">Action</Button>
              </EmptyStatePrimary>
            </EmptyState>
          )}
        </NotificationDrawerBody>
      </NotificationDrawer>
    );

    return (
      <React.Fragment>
        <Page
          header={Header}
          sidebar={Sidebar}
          isManagedSidebar
          notificationDrawer={notificationDrawer}
          isNotificationDrawerExpanded={isDrawerExpanded}
          skipToContent={PageSkipToContent}
          breadcrumb={PageBreadcrumb}
          mainContainerId={pageId}
        >
          <PageSection variant={PageSectionVariants.light}>
            <TextContent>
              <Text component="h1">Main title</Text>
              <Text component="p">
                Body text should be Overpass Regular at 16px. It should have leading of 24px because <br />
                of it’s relative line height of 1.5.
              </Text>
            </TextContent>
          </PageSection>
          <PageSection variant={PageSectionVariants.light} noPadding={true}>
            Panel section content
          </PageSection>
        </Page>
      </React.Fragment>
    );
  }
}

export { BasicNotificationDrawer };
