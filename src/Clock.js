import React, { Component } from 'react';
import './Clock.css';

export default () => {
    const radius = 80;
    return <svg viewBox="-100 -100 200 200" height="100vh" >
        <circle className="edge" r={radius} />
        <Ticks radius={radius} />
        <Hands radius={radius} />
    </svg>
}

class Hands extends Component {

    constructor(props) {
        super(props);
        this.state={seconds:0};

        this.arc = {
            radius: props.radius + 4
        }

        this.second = {
            width:1,
            height: props.radius,
            offset:5
        };

        this.minute = {
            width:3,
            height: props.radius * 0.75,
            offset: 5 
        };
        this.hour = {
            width: 3,
            height: props.radius * 0.5,
            offset: 5
        }
    }

    init() {
        const cd = new Date();
        const seconds = cd.getSeconds() + cd.getMilliseconds()/1000;
        const minutes = cd.getMinutes() + seconds/60;
        const hours = cd.getHours() + minutes/60;

        this.setState(state => ({
            seconds, minutes, hours
        }));
    }

    componentDidMount() {
        this.init();
    }

    arcStyle() {
        const circ = 2*Math.PI*this.arc.radius
        return {
            strokeDasharray: circ,
            strokeDashoffset:circ,
            animationDelay:`${-this.state.seconds}s`
        }
    }

    render() {

        return <>
                <circle className='second-arc' style={this.arcStyle()} r={this.arc.radius} />
                <rect className='second-hand'
                    x={-this.second.width/2}
                    y={-this.second.height + this.second.offset} 
                    width={this.second.width} 
                    height={this.second.height} 
                    style={{animationDelay:`${-this.state.seconds}s`}} />
                <rect className='minute-hand'
                    x={-this.minute.width/2} 
                    y={-this.minute.height + this.minute.offset} 
                    width={this.minute.width} 
                    height={this.minute.height}
                    style={{animationDelay:`${-this.state.minutes * 60}s`}} />
                <rect className='hour-hand'
                    x={-this.hour.width/2}
                    y={-this.hour.height + this.hour.offset}
                    width={this.hour.width}
                    height={this.hour.height}
                    style={{animationDelay:`${-this.state.hours * 60 * 60}s`}} />
            </>
    }
}

const Ticks = ({radius}) => {
    const n = 12;
    const tickWidth = 2;
    const margin=radius*0.05;

    const isMajor = i => 360/n*i%90===0;

    let i;
    const ticks = [];
    for (i=0; i<n; i++) {

        ticks.push(isMajor(i) ? <rect key ={i} y={-radius + margin} x={-tickWidth/2} width={tickWidth} height="15" transform={`rotate(${360/n*i}, 0, 0)`} /> :
            <rect key={i} y = {-radius + margin + 5} x={tickWidth/4} width={tickWidth/2} height="5" transform={`rotate(${360/n*i}, 0, 0)`} />);
    }
    return ticks;
}

