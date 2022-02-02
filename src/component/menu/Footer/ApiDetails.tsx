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
	const instanceId = props.uiConfig.versionInfo?.instanceId;
	const currentVersion = formatCurrentVersion(props.uiConfig);
	const environment = props.uiConfig.environment;
	const updateNotification = formatUpdateNotification(props.uiConfig);
	
	return (
		<section title="API details">
			<h4>
				{currentVersion}{' '}
				<ConditionallyRender
					condition={Boolean(environment)}
					show={<small>({environment})</small>}
				/>
			</h4>
			<ConditionallyRender
				condition={Boolean(updateNotification)}
				show={
					<small>
						{updateNotification}
						<br />
					</small>
				}
			/>
			<br />
			<small>{props.uiConfig.slogan}</small>
			<br />
			<ConditionallyRender
				condition={Boolean(instanceId)}
				show={<small>{`${instanceId}`}</small>}
			/>
		</section>
	);
};
