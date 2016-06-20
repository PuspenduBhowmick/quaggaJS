import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardTitle, CardText} from 'material-ui/Card';

import Scanner from './Scanner';
import ScanIcon from './ScanIcon';

export default class App extends React.Component {
    state = {
        drawerOpen: false,
        scanning: false,
        scannedCodes: [{
            codeResult: {
                code: "FANAVF1461710",
                format: "code_128"
            },
            timestamp: new Date()
        }]
    };

    _handleClose = () => this.setState({drawerOpen: false});
    _handleOpen = () => this.setState({drawerOpen: true});
    _handleOpenChange = () => (drawerOpen) => this.setState({drawerOpen});

    _startScanning = (e) => {
        e.preventDefault();
        if (!this.state.scanning) {
            this.setState({scanning: true});
        }
    };

    _stopScanning = () => {
        this.setState({scanning: false});
    };

    _handleResult = (result) => {
        this._stopScanning();
        this.setState({
            scannedCodes: [{...result, timestamp: new Date()}]
            .concat(this.state.scannedCodes)});
    }

    render() {
        return (
            <div>
                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.drawerOpen}
                    onRequestChange={this._handleOpenChange}
                >
                    <MenuItem onTouchTap={this._handleClose}>Menu Item</MenuItem>
                    <MenuItem onTouchTap={this._handleClose}>Menu Item 2</MenuItem>
                </Drawer>
                <AppBar
                    style={{position: 'fixed', top: '0px'}}
                    title="QuaggaJS"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonTouchTap={this._handleOpen}
                    />
                <FloatingActionButton
                    secondary={true}
                    onMouseDown={this._startScanning}
                    style={{position: 'fixed', right: 0, bottom: 0, margin: '0 1em 1em 0'}}
                >
                    <ScanIcon />
                </FloatingActionButton>
                <Dialog
                    style={{paddingTop: '0px'}}
                    bodyStyle={{padding: '0.5rem'}}
                    repositionOnUpdate={false}
                    actions={[
                        <FlatButton
                            label="Cancel"
                            primary={true}
                            onTouchTap={this._stopScanning}/>
                    ]}
                    modal={true}
                    contentStyle={{width: '95%', maxWidth: '95%', height: '95%', maxHeight: '95%'}}
                    open={this.state.scanning}
                >
                    <Scanner onDetected={this._handleResult} onCancel={this._stopScanning} />
                </Dialog>
                <div style={{paddingTop: '64px'}}>
                    {this.state.scannedCodes.map((scannedCode, i) => (
                        <Card key={i} style={{margin: '0.5em 0.25em 0em'}}>
                            <CardTitle
                                titleStyle={{textOverflow: 'ellipsis', overflow: 'hidden'}}
                                title={scannedCode.codeResult.code}
                                subtitle={scannedCode.codeResult.format}
                            />
                            <CardText>
                                Scanned on {scannedCode.timestamp.toLocaleString()}
                            </CardText>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }
}