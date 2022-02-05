import { FiGlobe } from 'react-icons/fi';
import {VscChevronDown} from 'react-icons/vsc';

export default function LoginFooter (){
    return (
        <>
            <div className="pageFooter">
                <div className="pageFooterChild">
                <span className="pageFooterItems"><a href="/">Privacy & Terms</a></span>
                <span className="pageFooterItems"><a href="/"> Contact us </a></span>
                <span className="pageFooterItems"><a href="/"> 
                    <FiGlobe/><span className="regionLabel">Change region</span> <VscChevronDown/></a> 
                </span>
            </div>
        </div>
        </>
    )
}