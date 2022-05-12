const core = require('@actions/core')
const exec = require('@actions/exec');

const telepresenceIntercept = async function(){
    try {
        const service_name = core.getInput('service_name');
        const service_port = core.getInput('service_port');
        const namespace = core.getInput('namespace');
        const http_header = core.getInput('http_header');
        const env_file = core.getInput('env_file');
        const ingress_host = core.getInput('ingress_host');
        const ingress_port = core.getInput('ingress_port');
        const ingress_tls = core.getInput('ingress_tls');
        const ingress_l5 = core.getInput('ingress_l5');
        await exec.exec('telepresence', ['intercept', service_name, '--port', service_port, '--ingress-host', ingress_host,
            '--ingress-port', ingress_port, ingress_tls && '--ingress-tls', '--ingress-l5', ingress_l5, '-n', namespace,
            `--http-header=${http_header}`, env_file === '' ? '':`-e ${env_file}`]);
    } catch (error) {
        core.setFailed(error.message);
    }
}


telepresenceIntercept();