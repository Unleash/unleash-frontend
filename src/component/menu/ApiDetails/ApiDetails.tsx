import useUiConfig from '../../../hooks/api/getters/useUiConfig/useUiConfig';
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

export function ApiDetailsContainer(): ReactElement {
	const { uiConfig } = useUiConfig();

	return <ApiDetails uiConfig={uiConfig} />;
}

export function ApiDetails(props: IProps): ReactElement {
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
}

function InstanceId(props: IProps) {
	const instanceId = props.uiConfig.versionInfo?.instanceId;

	return (
		<ConditionallyRender
			condition={instanceId}
			show={<small>{`${instanceId}`}</small>}
		/>
	);
}

function CurrentVersion(props: IProps) {
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
}

function UpdateNotification(props: IProps) {
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
}

function formatCurrentVersion(uiConfig: IPartialUiConfig): string {
	const current = uiConfig.versionInfo?.current;

	if (current?.enterprise) {
		return `${uiConfig.name} ${current.enterprise}`;
	}

	if (current?.oss) {
		return `${uiConfig.name} ${current.oss}`;
	}

	return `${uiConfig.name} ${uiConfig.version}`;
}

function formatUpdateNotification(
	uiConfig: IPartialUiConfig
): string | undefined {
	const latest = uiConfig.versionInfo?.latest;
	const isLatest = uiConfig.versionInfo?.isLatest;

	if (latest?.enterprise && !isLatest) {
		return `Upgrade available - Latest Enterprise release: ${latest.enterprise}`;
	}

	if (latest?.oss && !isLatest) {
		return `Upgrade available - Latest OSS release: ${latest.oss}`;
	}
}
