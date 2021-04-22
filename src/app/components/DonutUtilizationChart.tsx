import React from 'react';
import { ChartDonutUtilization } from '@patternfly/react-charts';

class DonutUtilizationChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spacer: '',
      used: 0
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const { used } = this.state;
      const val = (used + 10) % 100;
      this.setState({
        spacer: val < 10 ? ' ' : '',
        used: val
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { spacer, used } = this.state;
    return (
      <div style={{  height: '230px', width: '435px' }}>
        <ChartDonutUtilization
          ariaDesc="Storage capacity"
          ariaTitle="Donut utilization chart example"
          constrainToVisibleArea={true}
          data={{ x: 'GBps capacity', y: used }}
          labels={({ datum }) => datum.x ? `${datum.x}: ${datum.y}%` : null}
          legendData={[{ name: `Storage capacity: ${spacer}${used}%` }, { name: 'Unused' }]}
          legendOrientation="vertical"
          padding={{
            bottom: 20,
            left: 20,
            right: 225, // Adjusted to accommodate legend
            top: 20
          }}
          subTitle="of 100 GBps"
          title={`${used}%`}
          thresholds={[{ value: 60 }, { value: 90 }]}
          width={435}
        />
      </div>
    );
  }
}

export { DonutUtilizationChart };
