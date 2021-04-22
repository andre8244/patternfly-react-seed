import * as React from 'react';
import { PageSection, Title, Modal, ModalVariant, Tile, TitleSizes } from '@patternfly/react-core';
import { Chart, ChartAxis, ChartBar, ChartGroup, ChartVoronoiContainer } from '@patternfly/react-charts';
import { Button } from '@patternfly/react-core';
import TimesIcon from '@patternfly/react-icons/dist/js/icons/times-icon';
import PlusCircleIcon from '@patternfly/react-icons/dist/js/icons/plus-circle-icon';
import ExternalLinkSquareAltIcon from '@patternfly/react-icons/dist/js/icons/external-link-square-alt-icon';
import CopyIcon from '@patternfly/react-icons/dist/js/icons/copy-icon';
import PlusIcon from '@patternfly/react-icons/dist/js/icons/plus-icon';
import { DonutUtilizationChart } from '@app/components/DonutUtilizationChart';

import './Dashboard.css';

// const Dashboard: React.FunctionComponent = () => (
class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    };

    this.handleModalToggle = () => {
      this.setState(({ isModalOpen }) => ({
        isModalOpen: !isModalOpen
      }));
    };
  }

  componentDidMount() {
    console.log("Mount");
  }

  componentWillUnmount() {
    console.log("Unmount");
  }

  render() {
    const { isModalOpen } = this.state;

    return (
      <PageSection className="pf-m-light">
        {/* <Title headingLevel="h1" size="lg">Dashboard Page Title</Title> */}
        <Title headingLevel="h1" className="mg-bottom-sm">Dashboard Page Title</Title>

        <div className="mg-bottom-md">
          <DonutUtilizationChart />
        </div>

        <Button variant="primary" onClick={this.handleModalToggle} className="mg-bottom-md">Open modal</Button>

        <React.Fragment>
          <div>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>{' '}
            <Button variant="tertiary">Tertiary</Button>
            <Button variant="danger">Danger</Button>{' '}
            <Button variant="warning">Warning</Button><br /><br />
            <Button variant="link" icon={<PlusCircleIcon />}>
              Link
            </Button>{' '}
            <Button variant="link" icon={<ExternalLinkSquareAltIcon />} iconPosition="right">
              Link
            </Button>
            <Button variant="link" isInline>
              Inline link
            </Button><br /><br />
          </div>
        </React.Fragment>

        <div style={{ height: '250px', width: '600px' }}>
          <Chart
            ariaDesc="Average number of pets"
            ariaTitle="Bar chart example"
            containerComponent={<ChartVoronoiContainer labels={({ datum }) => `${datum.name}: ${datum.y}`} constrainToVisibleArea />}
            domain={{ y: [0, 9] }}
            domainPadding={{ x: [30, 25] }}
            legendData={[{ name: 'Cats' }, { name: 'Dogs' }, { name: 'Birds' }, { name: 'Mice' }]}
            legendOrientation="vertical"
            legendPosition="right"
            height={250}
            padding={{
              bottom: 50,
              left: 50,
              right: 200, // Adjusted to accommodate legend
              top: 50
            }}
            width={600}
          >
            <ChartAxis />
            <ChartAxis dependentAxis showGrid />
            <ChartGroup offset={11}>
              <ChartBar data={[{ name: 'Cats', x: '2015', y: 1 }, { name: 'Cats', x: '2016', y: 2 }, { name: 'Cats', x: '2017', y: 5 }, { name: 'Cats', x: '2018', y: 3 }]} />
              <ChartBar data={[{ name: 'Dogs', x: '2015', y: 2 }, { name: 'Dogs', x: '2016', y: 1 }, { name: 'Dogs', x: '2017', y: 7 }, { name: 'Dogs', x: '2018', y: 4 }]} />
              <ChartBar data={[{ name: 'Birds', x: '2015', y: 4 }, { name: 'Birds', x: '2016', y: 4 }, { name: 'Birds', x: '2017', y: 9 }, { name: 'Birds', x: '2018', y: 7 }]} />
              <ChartBar data={[{ name: 'Mice', x: '2015', y: 3 }, { name: 'Mice', x: '2016', y: 3 }, { name: 'Mice', x: '2017', y: 8 }, { name: 'Mice', x: '2018', y: 5 }]} />
            </ChartGroup>
          </Chart>
        </div>

        <React.Fragment>
          <Tile title="Default" icon={<PlusIcon />}>
            Subtext goes here
          </Tile>{' '}
          <Tile title="Selected" icon={<PlusIcon />} isSelected>
            Subtext goes here
          </Tile>{' '}
          <Tile title="Disabled" icon={<PlusIcon />} isDisabled>
            Subtext goes here
          </Tile>
        </React.Fragment>

        <Modal
          variant={ModalVariant.small}
          title="Small modal header"
          isOpen={isModalOpen}
          onClose={this.handleModalToggle}
          actions={[
            <Button key="confirm" variant="primary" onClick={this.handleModalToggle}>
              Confirm
            </Button>,
            <Button key="cancel" variant="link" onClick={this.handleModalToggle}>
              Cancel
            </Button>
          ]}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </Modal>
      </PageSection>
    );
    // )
  }
}

export { Dashboard };
