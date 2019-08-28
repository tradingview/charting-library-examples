import React from 'react';
import dynamic from 'next/dynamic';

const TVChartContainer = dynamic(
	() =>
		import('../components/TVChartContainer').then(mod => mod.TVChartContainer),
	{ ssr: false },
);

export default () => <TVChartContainer />;
