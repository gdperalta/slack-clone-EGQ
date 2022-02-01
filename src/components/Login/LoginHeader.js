export default function LoginHeader (){
    return(
        <div className="pageHeader">
                <div className="left-col">

                </div>
                <div className="centerCol" style={{display: 'flex', justifyContent: 'center'}}>
                        <img alt="Slack" src="http://a.slack-edge.com/bv1-9/slack_logo-ebd02d1.svg" height="34" title="Slack"/>
                </div>
                <div className="rightCol">
                    <div>
                        New to Slack? <br></br>
                        <div className="create">Create an account</div>
                    </div>
                </div>
        </div>
    )
}