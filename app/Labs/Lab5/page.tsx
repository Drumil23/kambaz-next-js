import EnvironmentVariables from './EnvironmentVariables';
import { HTTP_SERVER } from '../../lib/config';
import PathParameters from './PathParameters';
import QueryParameters from './QueryParameters';
import WorkingWithObjects from './WorkingWithObjects';
import WorkingWithArrays from './WorkingWithArrays';
import WorkingWithObjectsAsynchronously from './WorkingWithObjectsAsynchronously';
import WorkingWithArraysAsynchronously from './WorkingWithArraysAsynchronously';

export default function Lab5() {
    return (
        <div id="wd-lab5">
            <h2>Lab 5</h2><br />
            <div className="list-group">
                <a href={`${HTTP_SERVER}/lab5/welcome`} className="list-group-item">
                    Welcome
                </a><br />        
            </div>
            <EnvironmentVariables />  
            <PathParameters />
            <QueryParameters />
            <WorkingWithObjects />
            <WorkingWithArrays />
            <WorkingWithObjectsAsynchronously />
            <WorkingWithArraysAsynchronously />
            <hr />
        </div>
    );
}
