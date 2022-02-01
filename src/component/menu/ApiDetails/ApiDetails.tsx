import { ReactElement } from 'react';
import ConditionallyRender from '../../common/ConditionallyRender';
import { IVersionInfo } from '../../../interfaces/uiConfig';
import { formatCurrentVersion, formatUpdateNotification } from './ApiDetails.helpers';

export interface IPartialUiConfig {
	name: string;
	version: string;
	slogan?: string;
	environment?: string;
	versionInfo?: IVersionInfo;
}

interface IApiDetailsProps {
	uiConfig: IPartialUiConfig;
}

export const ApiDetails = (props: IApiDetailsProps): ReactElement => {
	return (
		<section title="API details">
			<CurrentVersion {...props} />
			<UpdateNotification {...props} />
			<br />
			<small>{props.uiConfig.slogan}</small>
			<br />
			<InstanceId {...props} />
		</section>
	);
};

const InstanceId = (props: IApiDetailsProps): ReactElement => {
	const instanceId = props.uiConfig.versionInfo?.instanceId;

	return (
		<ConditionallyRender
			condition={instanceId}
			show={<small>{`${instanceId}`}</small>}
		/>
	);
};

const CurrentVersion = (props: IApiDetailsProps): ReactElement => {
	const currentVersion = formatCurrentVersion(props.uiConfig);
	const environment = props.uiConfig.environment;

	return (
		<h4>
			{currentVersion}{' '}
			<ConditionallyRender
				condition={environment}
				show={<small>({environment})</small>}
			/>
		</h4>
	);
};

const UpdateNotification = (props: IApiDetailsProps): ReactElement => {
	const updateNotification = formatUpdateNotification(props.uiConfig);

	return (
		<ConditionallyRender
			condition={updateNotification}
			show={
				<small>
					{updateNotification}
					<br />
				</small>
			}
		/>
	);
};
