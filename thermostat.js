/**
 * Copyright 2019 Bart Butenaers & Dave North
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

module.exports = function(RED) {
    var settings = RED.settings;
    
    function HTML(config) {     
        // The configuration is a Javascript object, which needs to be converted to a JSON string
        var configAsJson = JSON.stringify(config);

        var html = String.raw`
            <style>
                #thermostat {
                    margin: 0 auto;
                    padding: 10px;
                    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                }
                .dial {
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                }


                .dial.away .dial__ico__leaf {
                    //visibility: hidden;
                    opacity: 1;   
                }
                .dial.away .dial__lbl--target {
                    visibility: hidden;
                    //opacity: 1;   
                }
                .dial.away .dial__lbl--target--half {
                    visibility: hidden;
                    //opacity: 1;   
                }
                .dial.away .dial__lbl--away {
                    opacity: 2;
                }

                .dial.eco .dial__lbl--target {
                    visibility: hidden;
                }
                .dial.eco .dial__lbl--target--half {
                    visibility: hidden;
                }
                .dial.eco .dial__lbl--eco {
                    opacity: 1;
                }

                .dial.off .dial__lbl--target {
                    visibility: hidden;
                }
                .dial.off .dial__lbl--target--half {
                    visibility: hidden;
                }
                .dial.off .dial__lbl--off {
                    opacity: 1;
                }
                    
                .dial .dial__shape {
                    -webkit-transition: fill 0.5s;
                    transition: fill 0.5s;
                }
                .dial__ico__leaf {
                    fill: #13EB13;
                    opacity: 0;
                    -webkit-transition: opacity 0.5s;
                    transition: opacity 0.5s;
                    pointer-events: none;
                }
                .dial.has-leaf .dial__ico__leaf {
                    display: block;
                    opacity: 1;
                    pointer-events: initial;
                }
                .dial__editableIndicator {
                    fill: white;
                    fill-rule: evenodd;
                    opacity: 0;
                    -webkit-transition: opacity 0.5s;
                    transition: opacity 0.1s;
                }
                .dial--edit .dial__editableIndicator {
                    opacity: 1;
                }
                .dial--state--off .dial__shape {
                    fill: #3d3c3c;
                }
                .dial--state--heating .dial__shape {
                    fill: #E36304;
                }
                .dial--state--cooling .dial__shape {
                    fill: #007AF1;
                }
                .dial__ticks path {
                    fill: rgba(255, 255, 255, 0.3);
                }
                .dial__ticks path.active {
                    fill: rgba(0, 255, 255, 2.8)  
                }
                .dial text {
                    fill: white;
                    text-anchor: middle;
                    font-family: Helvetica, sans-serif;
                    alignment-baseline: central;
                }

                .dial__lbl--info1 {
                    font-size: 19px;
                    font-weight: 500;
                    opacity: 1;
                    pointer-events: none;  
                }
                .dial__lbl--info2 {
                    font-size: 24px;
                    font-weight: 500;
                    opacity: 1;
                    pointer-events: none;  
                }
                .dial__lbl--info3 {
                    font-size: 18px;
                    font-weight: 500;
                    opacity: 1;
                    pointer-events: none;  
                }
                .dial__lbl--target {
                    font-size: 120px;
                    font-weight: bold;
                }
                .dial__lbl--target--half {
                    font-size: 40px;
                    font-weight: bold;
                    opacity: 0;
                    -webkit-transition: opacity 0.1s;
                    transition: opacity 0.1s;
                }
                .dial__lbl--target--half.shown {
                    opacity: 1;
                    -webkit-transition: opacity 0s;
                    transition: opacity 0s;
                }

		.dial__lbl--target_sm {
		    font-size: 18px;
		    font-weight: 500;
		}

                .dial__lbl--ambient {
                    font-size: 18px;
                    font-weight: 500;
                }

                .dial__lbl--ambient--half {
                    font-size: 10px;
                    font-weight: bold;
                    opacity: 0;
                    -webkit-transition: opacity 0.1s;
                    transition: opacity 0.1s;
                }
                .dial__lbl--ambient--half.shown {
                    opacity: 1;
                    -webkit-transition: opacity 0s;
                    transition: opacity 0s;
                }

                .dial__lbl--away {
                    font-size: 60px;
                    font-weight: bold;
                    opacity: 0;
                    pointer-events: none;
                }

                .dial__lbl--eco {
                    font-size: 75px;
                    font-weight: bold;
                    opacity: 0;
                    pointer-events: none;
                }

                .dial__lbl--off {
                    font-size: 52px;
                    font-weight: bold;
                    opacity: 0;
                    pointer-events: none;
                }

                #controls {
                    font-family: Open Sans;
                    background-color: rgba(255, 255, 255, 0.25);
                    padding: 20px;
                    border-radius: 5px;
                    position: absolute;
                    left: 50%;
                    -webkit-transform: translatex(-50%);
                    transform: translatex(-50%);
                    margin-top: 20px;
                }
                #controls label {
                    text-align: left;
                    display: block;
                }
                #controls label span {
                    display: inline-block;
                    width: 200px;
                    text-align: right;
                    font-size: 0.8em;
                    text-transform: uppercase;
                }
                #controls p {
                    margin: 0;
                    margin-bottom: 1em;
                    padding-bottom: 1em;
                    border-bottom: 2px solid #ccc;
                }

                .md-down_chevron:active {
                    border-radius:50px 50px 50px 50px;
                    -moz-border-radius:50px 50px 50px 50px;
                    -webkit-border-radius:50px 50px 50px 50px;
                    top:2px;
                    background-color:transparent;	
                }
                .md-down_chevron{
                    position:absolute;    
                    display: inline-block;   
                    margin: 82% 0% 0% 34%;
                    width: 35px; 	
                    height:50px;	
                    background: transparent;	
                    text-align:center;
                 }
                 
                .md-am:active {
                    border-radius:50px 50px 50px 50px;
                    -moz-border-radius:50px 50px 50px 50px;
                    -webkit-border-radius:50px 50px 50px 50px;
                    top:5px;
                    background-color:transparent;	
                }
                .md-am{
                    position:absolute;    
                    display: inline-block;   
                    margin:84% 0% 0% 45%;
                    width: 35px; 
                    height:50px;	
                    background: transparent;	
                    text-align:center;
                 } 
                 
                .md-up_chevron:active {
                    border-radius:50px 50px 50px 50px;
                    -moz-border-radius:50px 50px 50px 50px;
                    -webkit-border-radius:50px 50px 50px 50px;
                    top:2px;
                    background-color:transparent;	
                } 
                .md-up_chevron{
                    position:absolute;
                    display: inline-block;
                    margin:82% 0% 0% 56%;     
                    width: 35px; 
                    height:50px;	
                    background: transparent;
                    text-align:center;	
                 }

		.md-flame{
		    position:absolute;
    		    display: inline-block;
		    margin:5% 0% 0% 85%;    
		    width: 35px; 
		    height:50px;	
    		    background: transparent;
		    text-align:center;	
 		}		

            </style>
        
            <div id="thermostat" height="100%" width="100%" ng-init='init(` + configAsJson + `)'></div>

            <md-down_chevron class="md-down_chevron"
                ng-mousedown = "msg.topic = 'action'; msg.payload = 'down'; send(msg)">
                <img height="24px" ng-src="{{(msg.payload='ui_thermostat/resources/down-chevron.png')}}">
            </md-down_chevron>

            <md-am class="md-am"
                ng-mousedown = "msg.topic = 'action'; msg.payload = 'am'; send(msg)">
                <img height="24px" ng-src="{{msg.icon}}">
            </md-am>

            <md-up_chevron class="md-up_chevron"
                ng-mousedown ="msg.topic = 'action'; msg.payload = 'up'; send(msg)">
                <img height="24px" ng-src="{{(msg.payload='ui_thermostat/resources/up-chevron.png')}}">
            </md-up_chevron>

	    <md-flame class="md-flame">
    		<img height="24px" ng-src="{{msg.icon2}}">
	    </md-flame>
        `;
        
        return html;
    };

    function checkConfig(node, conf) {
        if (!conf || !conf.hasOwnProperty("group")) {
            node.error(RED._("ui_my-little-ui-node.error.no-group"));
            return false;
        }
        return true;
    }

    var ui = undefined;
    
    function UiThermostatNode(config) {
        try {
            var node = this;
            if(ui === undefined) {
                ui = RED.require("node-red-dashboard")(RED);
            }
            RED.nodes.createNode(this, config);

            if (checkConfig(node, config)) { 
                var html = HTML(config);
                var done = ui.addWidget({
                    node: node,
                    group: config.group,
                    width: config.width,
                    height: config.height,
                    format: html,
                    templateScope: "local",
                    emitOnlyNewValues: false,
                    forwardInputMessages: false,
                    storeFrontEndInputAsState: false,
                    convertBack: function (value) {
                        return value;
                    },
                    beforeEmit: function(msg, value) {
                        return { msg: msg };
                    },
                    beforeSend: function (msg, orig) {
                        if (orig) {
                            return orig.msg;
                        }
                    },
                    initController: function($scope, events) {
                        // =========================================================================================
                        // Widget from Codepen by Dal Hundal: https://codepen.io/dalhundal/pen/KpabZB
                        // =========================================================================================
                        var thermostatDial = (function() {
                            /*
                             * Utility functions
                             */	 

                            // Create an element with proper SVG namespace, optionally setting its attributes and appending it to another element
                            function createSVGElement(tag,attributes,appendTo) {
                                var element = document.createElementNS('http://www.w3.org/2000/svg',tag);
                                attr(element,attributes);
                                if (appendTo) {
                                    appendTo.appendChild(element);
                                }
                                return element;
                            }
                            
                            // Set attributes for an element
                            function attr(element,attrs) {
                                for (var i in attrs) {
                                    element.setAttribute(i,attrs[i]);
                                }
                            }
                            
                            // Rotate a cartesian point about given origin by X degrees
                            function rotatePoint(point, angle, origin) {
                                var radians = angle * Math.PI/180;
                                var x = point[0]-origin[0];
                                var y = point[1]-origin[1];
                                var x1 = x*Math.cos(radians) - y*Math.sin(radians) + origin[0];
                                var y1 = x*Math.sin(radians) + y*Math.cos(radians) + origin[1];
                                return [x1,y1];
                            }
                            
                            // Rotate an array of cartesian points about a given origin by X degrees
                            function rotatePoints(points, angle, origin) {
                                return points.map(function(point) {
                                    return rotatePoint(point, angle, origin);
                                });
                            }
                            
                            // Given an array of points, return an SVG path string representing the shape they define
                            function pointsToPath(points) {
                                return points.map(function(point, iPoint) {
                                    return (iPoint>0?'L':'M') + point[0] + ' ' + point[1];
                                }).join(' ')+'Z';
                            }
                            
                            function circleToPath(cx, cy, r) {
                                return [
                                    "M",cx,",",cy,
                                    "m",0-r,",",0,
                                    "a",r,",",r,0,1,",",0,r*2,",",0,
                                    "a",r,",",r,0,1,",",0,0-r*2,",",0,
                                    "z"
                                ].join(' ').replace(/\s,\s/g,",");
                            }
                            
                            function donutPath(cx,cy,rOuter,rInner) {
                                return circleToPath(cx,cy,rOuter) + " " + circleToPath(cx,cy,rInner);
                            }
                            
                            // Restrict a number to a min + max range
                            function restrictToRange(val,min,max) {
                                if (val < min) return min;
                                if (val > max) return max;
                                return val;
                            }
                            
                            // Round a number to the nearest 0.1
                            function roundHalf(num) {
                                return Math.round(num*10)/10;;
                            }
                            
                            function setClass(el, className, state) {
                                el.classList[state ? 'add' : 'remove'](className);
                            }
                            
                            /*
                             * The "MEAT"
                             */

                            return function(targetElement, options) {
                                var self = this;
                                
                                /*
                                 * Options
                                 */
                                options = options || {};
                                options = {
                                    diameter: options.diameter || 400,
                                    minValue: options.minValue || 10, // Minimum value for target temperature
                                    maxValue: options.maxValue || 30, // Maximum value for target temperature
                                    numTicks: options.numTicks || 200, // Number of tick lines to display around the dial
                                    onSetTargetTemperature: options.onSetTargetTemperature || function() {}, // Function called when new target temperature set by the dial
                                    onSetInfoOne: options.onSetInfoOne || function() {}, // Function called when new InfoOne set by the dial			
                                };
                                
                                /*
                                 * Properties - calculated from options in many cases
                                 */
                                var properties = {
                                    tickDegrees: 300, //  Degrees of the dial that should be covered in tick lines
                                    rangeValue: options.maxValue - options.minValue,
                                    radius: options.diameter/2,
                                    ticksOuterRadius: options.diameter / 30,
                                    ticksInnerRadius: options.diameter / 8,
                                    hvac_states: ['off', 'eco', 'away', 'heating', 'cooling'],
                                    dragLockAxisDistance: 15,
                                }
                                properties.lblAmbientPosition = [properties.radius, properties.ticksOuterRadius-(properties.ticksOuterRadius-properties.ticksInnerRadius)/2]
                                properties.offsetDegrees = 180-(360-properties.tickDegrees)/2;
                                properties.lblTargetPosition = [properties.radius, properties.ticksOuterRadius-(properties.ticksOuterRadius-properties.ticksInnerRadius)/2]
				properties.offsetDegrees = 180-(360-properties.tickDegrees)/2; 
                                /*
                                 * Object state
                                 */
                                var state = {
                                    target_temperature: options.minValue,
                                    ambient_temperature: options.minValue,
                                    hvac_state: properties.hvac_states[0],
                                    has_leaf: false,
                                    away: false,
                                    eco: false,
                                    off: false,
                                };
                                
                                /*
                                 * Property getter / setters
                                 */
                                Object.defineProperty(this,'target_temperature',{
                                    get: function() {
                                        return state.target_temperature;
                                    },
                                    set: function(val) {
                                        state.target_temperature = restrictTargetTemperature(+val);
                                        render();
                                    }
                                });
                                
                                Object.defineProperty(this,'ambient_temperature',{
                                    get: function() {
                                        return state.ambient_temperature;
                                    },
                                    set: function(val) {
                                        state.ambient_temperature = roundHalf(+val);
                                        render();
                                    }
                                });
                                Object.defineProperty(this,'hvac_state',{
                                    get: function() {
                                        return state.hvac_state;
                                    },
                                    set: function(val) {
                                        if (properties.hvac_states.indexOf(val)>=0) {
                                            state.hvac_state = val;
                                            render();
                                        }
                                    }
                                });
                                Object.defineProperty(this,'has_leaf',{
                                    get: function() {
                                        return state.has_leaf;
                                    },
                                    set: function(val) {
                                        state.has_leaf = !!val;
                                        render();
                                    }
                                });
                                Object.defineProperty(this,'away',{
                                    get: function() {
                                        return state.away;
                                    },
                                    set: function(val) {
                                        state.away = !!val;
                                        render();
                                    }
                                });

                                Object.defineProperty(this,'eco',{
                                    get: function() {
                                        return state.eco;
                                    },
                                    set: function(val) {
                                        state.eco = !!val;
                                        render();
                                    }
                                });

                                Object.defineProperty(this,'off',{
                                    get: function() {
                                        return state.off;
                                    },
                                    set: function(val) {
                                        state.off = !!val;
                                        render();
                                    }
                                });
                                
                                
                                Object.defineProperty(this,'info_one',{
                                    get: function() {
                                        return state.info_one;
                                    },
                                    set: function(val) {
                                        state.info_one = (val);				
                                        render();
                                    }
                                });	
                                
                                Object.defineProperty(this,'info_two',{
                                    get: function() {
                                        return state.info_two;
                                    },
                                    set: function(val) {
                                        state.info_two = (val);				
                                        render();
                                    }
                                });	
                                
                                Object.defineProperty(this,'info_three',{
                                    get: function() {
                                        return state.info_three;
                                    },
                                    set: function(val) {
                                        state.info_three = (val);				
                                        render();
                                    }
                                });			
                                
                                
                                /*
                                 * SVG
                                 */
                                 
                                var svg = createSVGElement('svg',{
                                    width: '100%', //options.diameter+'px',
                                    height: '100%', //options.diameter+'px',
                                    viewBox: '0 0 '+options.diameter+' '+options.diameter,
                                    class: 'dial'
                                },targetElement);
                                // CIRCULAR DIAL
                                var circle = createSVGElement('circle',{
                                    cx: properties.radius,
                                    cy: properties.radius,
                                    r: properties.radius,
                                    class: 'dial__shape'
                                },svg);
                                // EDITABLE INDICATOR
                                var editCircle = createSVGElement('path',{
                                    d: donutPath(properties.radius,properties.radius,properties.radius-4,properties.radius-8),
                                    class: 'dial__editableIndicator',
                                },svg);
                                
                                /*
                                 * Ticks
                                 */
                                var ticks = createSVGElement('g',{
                                    class: 'dial__ticks'	
                                },svg);
                                var tickPoints = [
                                    [properties.radius-1, properties.ticksOuterRadius],
                                    [properties.radius+1, properties.ticksOuterRadius],
                                    [properties.radius+1, properties.ticksInnerRadius],
                                    [properties.radius-1, properties.ticksInnerRadius]
                                ];
                                var tickPointsLarge = [
                                    [properties.radius-1.5, properties.ticksOuterRadius],
                                    [properties.radius+1.5, properties.ticksOuterRadius],
                                    [properties.radius+1.5, properties.ticksInnerRadius+20],
                                    [properties.radius-1.5, properties.ticksInnerRadius+20]
                                ];
                                var theta = properties.tickDegrees/options.numTicks;
                                var tickArray = [];
                                for (var iTick=0; iTick<options.numTicks; iTick++) {
                                    tickArray.push(createSVGElement('path',{d:pointsToPath(tickPoints)},ticks));
                                };

                                /*
                                 * Labels
                                 */
                                 
                                // 
                                var lblTarget = createSVGElement('text',{
                                    x: properties.radius,
                                    y: properties.radius,
                                    class: 'dial__lbl dial__lbl--target'
                                },svg);
                                var lblTarget_text = document.createTextNode('');
                                lblTarget.appendChild(lblTarget_text);
                                
                                var lblTargetHalf = createSVGElement('text',{
                                    x: properties.radius + properties.radius/2.5,
                                    y: properties.radius - properties.radius/8,
                                    class: 'dial__lbl dial__lbl--target--half'
                                },svg);
                                var lblTargetHalf_text = document.createTextNode('5');
                                lblTargetHalf.appendChild(lblTargetHalf_text);
				    
                                var lblTarget_sm = createSVGElement('text',{
					class: 'dial__lbl dial__lbl--target_sm'
				},svg);
				var lblTarget_sm_text = document.createTextNode('');
				lblTarget_sm.appendChild(lblTarget_sm_text);

                                var lblAmbient = createSVGElement('text',{
                                    class: 'dial__lbl dial__lbl--ambient'
                                },svg);
                                var lblAmbient_text = document.createTextNode('');
                                lblAmbient.appendChild(lblAmbient_text);
                                
                                //
                                var lblAway = createSVGElement('text',{
                                    x: properties.radius,
                                    y: properties.radius,
                                    class: 'dial__lbl dial__lbl--away'
                                },svg);
                                
                                var lblEco = createSVGElement('text',{
                                    x: properties.radius,
                                    y: properties.radius,
                                    class: 'dial__lbl dial__lbl--eco'
                                },svg);		
                                
                                var lblOff = createSVGElement('text',{
                                    x: properties.radius,
                                    y: properties.radius,
                                    class: 'dial__lbl dial__lbl--off'
                                },svg);	


                                var lblAway_text = document.createTextNode('AWAY');
                                lblAway.appendChild(lblAway_text);
                                //
                                var lblEco_text = document.createTextNode('ECO');
                                lblEco.appendChild(lblEco_text);		
                                //
                                var lblOff_text = document.createTextNode('Heat off');
                                lblOff.appendChild(lblOff_text);
                                //		
                                var icoLeaf = createSVGElement('path',{
                                    class: 'dial__ico__leaf'
                                },svg);
                                
                                /*
                                * INFO's
                                */
                                var lblInfo1 = createSVGElement('text',{
                                    x: properties.radius, // text is centered
                                    y: properties.radius +95,
                                    class: 'dial__lbl dial__lbl--info1'
                                },svg);
                                var lblInfo1_text = document.createTextNode('');
                                lblInfo1.appendChild(lblInfo1_text);	
                            
                                var lblInfo2 = createSVGElement('text',{
                                    x: properties.radius, // text is centered
                                    y: properties.radius -70,
                                    class: 'dial__lbl dial__lbl--info2'
                                },svg);
                                var lblInfo2_text = document.createTextNode('');
                                lblInfo2.appendChild(lblInfo2_text);
                            
                                var lblInfo3 = createSVGElement('text',{
                                    x: properties.radius, // text is centered
                                    y: properties.radius +70,
                                    class: 'dial__lbl dial__lbl--info3'
                                },svg);
                                var lblInfo3_text = document.createTextNode('');
                                lblInfo3.appendChild(lblInfo3_text);		
                                
                                /*
                                 * LEAF
                                 */
                                var leafScale = properties.radius/5/100;
                                var leafDef = ["M", 3, 84, "c", 24, 17, 51, 18, 73, -6, "C", 100, 52, 100, 22, 100, 4, "c", -13, 15, -37, 9, -70, 19, "C", 4, 32, 0, 63, 0, 76, "c", 6, -7, 18, -17, 33, -23, 24, -9, 34, -9, 48, -20, -9, 10, -20, 16, -43, 24, "C", 22, 63, 8, 78, 3, 84, "z"].map(function(x) {
                                    return isNaN(x) ? x : x*leafScale;
                                }).join(' ');
                                var translate = [properties.radius-(leafScale*100*0.5),properties.radius*1.5]
                                var icoLeaf = createSVGElement('path',{
                                    class: 'dial__ico__leaf',
                                    d: leafDef,
                                    transform: 'translate('+translate[0]+','+translate[1]+')'
                                },svg);
                                    
                                /*
                                 * RENDER
                                 */
                                function render() {
                                    renderAway();
                                    renderEco();
                                    renderOff();			
                                    renderHvacState();
                                    renderTicks();
                                    renderTargetTemperature();
                                    renderAmbientTemperature();
                                    renderLeaf();
                                    renderInfoOne();
                                    renderInfoTwo();
                                    renderInfoThree();			
                                }
                                render();

                                /*
                                 * RENDER - ticks
                                 */
                                function renderTicks() {
                                    var vMin, vMax;
				    /* mod to show ticks in away mode					
                                    if (self.away) {
                                        vMin = self.ambient_temperature;
                                        vMax = vMin;
                                    } else {
				    */
                                     vMin = Math.min(self.ambient_temperature, self.target_temperature);
                                     vMax = Math.max(self.ambient_temperature, self.target_temperature);
                                    //}
                                    var min = restrictToRange(Math.round((vMin-options.minValue)/properties.rangeValue * options.numTicks),0,options.numTicks-1);
                                    var max = restrictToRange(Math.round((vMax-options.minValue)/properties.rangeValue * options.numTicks),0,options.numTicks-1);
                                    //
                                    tickArray.forEach(function(tick,iTick) {
                                        var isLarge = iTick==min || iTick==max;
                                        var isActive = iTick >= min && iTick <= max;
                                        attr(tick,{
                                            d: pointsToPath(rotatePoints(isLarge ? tickPointsLarge: tickPoints,iTick*theta-properties.offsetDegrees,[properties.radius, properties.radius])),
                                            class: isActive ? 'active' : ''
                                        });
                                    });
                                }
                            
                                /*
                                 * RENDER - ambient temperature
                                 */
                                function renderAmbientTemperature() {
                                    lblAmbient_text.nodeValue = self.ambient_temperature;		
                                    //if (self.ambient_temperature%1!=0) {
                                    //}
                                    var peggedValue = restrictToRange(self.ambient_temperature, options.minValue, options.maxValue);
                                    degs = properties.tickDegrees * (peggedValue-options.minValue)/properties.rangeValue - properties.offsetDegrees;
                                    if (peggedValue > self.target_temperature) {
                                        degs += 8;
                                    } else {
                                        degs -= 8;
                                    }
                                    var pos = rotatePoint(properties.lblAmbientPosition,degs,[properties.radius, properties.radius]);
                                    attr(lblAmbient,{
                                        x: pos[0],
                                        y: pos[1]
                                    });
                                }

                                /*
                                 * RENDER - target temperature
                                 */
                                function renderTargetTemperature() {
                                    lblTarget_text.nodeValue = Math.floor(self.target_temperature);
                                    setClass(lblTargetHalf,'shown',self.target_temperature%1!=0);
				    lblTarget_sm_text.nodeValue = self.target_temperature;
				    var peggedValue_one = restrictToRange(self.target_temperature, options.minValue, options.maxValue); 
				    degs = properties.tickDegrees * (peggedValue_one-options.minValue)/properties.rangeValue - properties.offsetDegrees; 
				    if (peggedValue_one > self.ambient_temperature) {
					degs += 8;
				    } else {
					degs -= 8;
				    } 
				    var pos = rotatePoint(properties.lblTargetPosition,degs,[properties.radius, properties.radius]);
				    attr(lblTarget_sm,{
				 	x: pos[0],
					y: pos[1]
				    }); 
                                }
                                /*
                                 * RENDER - leaf
                                 */
                                function renderLeaf() {
                                    setClass(svg,'has-leaf',self.has_leaf);
                                }
                                
                                /*
                                 * RENDER - HVAC state
                                 */
                                function renderHvacState() {
                                    Array.prototype.slice.call(svg.classList).forEach(function(c) {
                                        if (c.match(/^dial--state--/)) {
                                            svg.classList.remove(c);
                                        };
                                    });
                                    svg.classList.add('dial--state--'+self.hvac_state);
                                }
                                
                                /*
                                 * RENDER - away
                                 */
                                function renderAway() {
                                    svg.classList[self.away ? 'add' : 'remove']('away');
                                }
                                /*
                                 * RENDER - eco
                                 */		
                                function renderEco() {
                                    svg.classList[self.eco ? 'add' : 'remove']('eco');
                                }
                                /*		
                                 * RENDER - off
                                 */		
                                function renderOff() {
                                    svg.classList[self.off ? 'add' : 'remove']('off');
                                }
                                /*
                                 * RENDER - infos
                                 */
                                function renderInfoOne() {
                                    lblInfo1_text.nodeValue = (self.info_one);			
                                }
                                function renderInfoTwo() {
                                    lblInfo2_text.nodeValue = (self.info_two);			
                                }	
                                function renderInfoThree() {
                                    lblInfo3_text.nodeValue = (self.info_three);			
                                }		
                                /*
                                 * Helper functions
                                 */
                                function restrictTargetTemperature(t) {
                                    return restrictToRange(roundHalf(t),options.minValue,options.maxValue);
                                }

                                function angle(point) {
                                    var dx = point[0] - properties.radius;
                                    var dy = point[1] - properties.radius;
                                    var theta = Math.atan(dx/dy) / (Math.PI/180);
                                    if (point[0]>=properties.radius && point[1] < properties.radius) {
                                        theta = 90-theta - 90;
                                    } else if (point[0]>=properties.radius && point[1] >= properties.radius) {
                                        theta = 90-theta + 90;
                                    } else if (point[0]<properties.radius && point[1] >= properties.radius) {
                                        theta = 90-theta + 90;
                                    } else if (point[0]<properties.radius && point[1] < properties.radius) {
                                        theta = 90-theta+270;
                                    }
                                    return theta;
                                };
                                
                                function getSizeRatio() {
                                    return options.diameter / targetElement.clientWidth;
                                }
                                
                            };
                        })(); // End of thermostatDial widget ...

                        $scope.flag = true;
                
                        $scope.init = function (config) {
                            $scope.config = config;
                            
                            $scope.nest = new thermostatDial(document.getElementById('thermostat'),{
                                onSetTargetTemperature: function(v) {
                                    scope.send({topic: "target_temperature", payload: v});
                                }
                            });
                        }

                        $scope.$watch('msg', function(msg) {
                             if (!msg) {
                                // Ignore undefined msg
                                return;
                            }
                            
                            //console.log(msg.topic+"  "+msg.payload);
                            if (msg.topic == "current") {            
                                $scope.nest.ambient_temperature = msg.payload;
                            } if (msg.topic == "target") {            
                                $scope.nest.target_temperature = msg.payload;
                            } if (msg.topic == "hvac_state") {
                                $scope.nest.hvac_state = msg.payload;
                            } if (msg.topic == "has_leaf") {
                                $scope.nest.has_leaf = msg.payload;           
                            } if (msg.topic == "away") {
                                $scope.nest.away = msg.payload;
                            } if (msg.topic == "eco") {
                                $scope.nest.eco = msg.payload;
                            } if (msg.topic == "off") {
                                $scope.nest.off = msg.payload; 
                            } if (msg.topic == "info1") {            
                                $scope.nest.info_one = msg.payload; 
                            } if (msg.topic == "info2") {            
                                $scope.nest.info_two = msg.payload;
                            } if (msg.topic == "info3") {            
                                $scope.nest.info_three = msg.payload;            
                            }	
                        });
                    }
                });
            }
        }
        catch (e) {
            console.log(e);
        }
		
        node.on("close", function() {
            if (done) {
                done();
            }
        });
    }

    RED.nodes.registerType("ui_thermostat", UiThermostatNode);
    
    // By default the UI path in the settings.js file will be in comment:
    //     //ui: { path: "ui" },
    // But as soon as the user has specified a custom UI path there, we will need to use that path:
    //     ui: { path: "mypath" },
    var uiPath = ((RED.settings.ui || {}).path) || 'ui';

    // Make all the static resources from this node public available (i.e. down-chevron.png & up-chevron.png files), for the client-side dashboard widget.
    RED.httpNode.get('/' + uiPath + '/ui_thermostat/resources/*', function(req, res){
        var options = {
            root: __dirname + '/resources/',
            dotfiles: 'deny'
        };
       
        // Send the requested file to the client
        res.sendFile(req.params[0], options)
    });
}
