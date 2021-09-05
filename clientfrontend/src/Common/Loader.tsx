import { Dimmer, Loader } from 'semantic-ui-react';

interface Props{
    inverted: boolean;
    content: string;
}

function LoaderComponent(props:Props) {
    return (
        <Dimmer active inverted={props.inverted}>
            <Loader content={props.content} />
        </Dimmer>
    );
}
export default LoaderComponent;