import { ReactElement } from 'react';
import ConditionallyRender from '../../common/ConditionallyRender';
import { IVersionInfo } from '../../../interfaces/uiConfig';

interface IPartialUiConfig {
	name: string;
	version: string;
	slogan?: string;
	environment?: string;
	versionInfo?: IVersionInfo;
}

interface IProps {
	uiConfig: IPartialUiConfig;
}

export const ApiDetails = (props: IProps): ReactElement => {
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

const InstanceId = (props: IProps): ReactElement => {
	const instanceId = props.uiConfig.versionInfo?.instanceId;

	return (
		<ConditionallyRender
			condition={instanceId}
			show={<small>{`${instanceId}`}</small>}
		/>
	);
};

const CurrentVersion = (props: IProps): ReactElement => {
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

const UpdateNotification = (props: IProps): ReactElement => {
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

const formatCurrentVersion = (uiConfig: IPartialUiConfig): string => {
	const current = uiConfig.versionInfo?.current;

	if (current?.enterprise) {
		return `${uiConfig.name} ${current.enterprise}`;
	}

	if (current?.oss) {
		return `${uiConfig.name} ${current.oss}`;
	}

	return `${uiConfig.name} ${uiConfig.version}`;
};

const formatUpdateNotification = (
	uiConfig: IPartialUiConfig
): string | undefined => {
	const latest = uiConfig.versionInfo?.latest;
	const isLatest = uiConfig.versionInfo?.isLatest;

	if (latest?.enterprise && !isLatest) {
		return `Upgrade available - Latest Enterprise release: ${latest.enterprise}`;
	}

	if (latest?.oss && !isLatest) {
		return `Upgrade available - Latest OSS release: ${latest.oss}`;
	}
};
