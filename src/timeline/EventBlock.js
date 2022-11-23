import XDate from 'xdate';
import React, { useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const TEXT_LINE_HEIGHT = 17;
const EVENT_DEFAULT_COLOR = '#add8e6';
const EventBlock = (props) => {
    const { index, event, renderEvent, onPress, format24h, styles } = props;
    // Fixing the number of lines for the event title makes this calculation easier.
    // However it would make sense to overflow the title to a new line if needed
    const numberOfLines = Math.floor(event.height / TEXT_LINE_HEIGHT);
    const formatTime = format24h ? 'HH:mm' : 'hh:mm A';
    const eventStyle = useMemo(() => {
        return {
            left: event.left,
            height: event.height,
            width: event.width,
            top: event.top,
            backgroundColor: event.color ? event.color : EVENT_DEFAULT_COLOR
        };
    }, [event]);
    const _onPress = useCallback(() => {
        onPress(index);
    }, [index, onPress]);
    return (<TouchableOpacity activeOpacity={0.9} onPress={_onPress} style={[styles.event, eventStyle,{minHeight:45} ]}>
      {renderEvent ? (renderEvent(event)) : (<View style={[{width:'100%', height:'100%'}, (( new Date().getTime()> new Date(event.start).getTime())? {backgroundColor:'#EBF1FF'} : {backgroundColor:'#BCCDFA'} ) ]}>
            <View style={[{ height: '40%' }, (( new Date().getTime()> new Date(event.start).getTime())? {backgroundColor:'#C9D3E9'} : {backgroundColor: '#a3b8ec'} ) ]}>
                <View style={{
                    justifyContent:'center',
                    paddingLeft: '5%',
                }}>
                    <Text numberOfLines={1} style={[styles.eventTitle,new Date().getTime()> new Date(event.start).getTime()?{color:'#8D97AB'}:null]}>
                        {event.title || 'Event'}
                    </Text>
                </View>
                
            </View>

            {/* {numberOfLines > 1 ? ( */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                    <Image style={[{ width: 25, height: 25, marginRight: 5 }, new Date().getTime()>new Date(event.start).getTime()?{tintColor:'#8D97AB'}:null]} source={require('../calendar/img/calendar.png')} />
                    <Text numberOfLines={numberOfLines - 1} style={[styles.eventSummary, {marginRight:20}, new Date().getTime()>new Date(event.start).getTime()?{color:'#8D97AB'}:null]}>
                        {new XDate(event.start).toString("dd/mm/yyyy") + "  "}
                    </Text>
                    <Image style={[{ width: 25, height: 25, marginRight: 5 },new Date().getTime()>new Date(event.start).getTime()?{tintColor:'#8D97AB'}:null]} source={require('../calendar/img/time.png')} />

                    <Text numberOfLines={numberOfLines - 1} style={[styles.eventSummary, new Date().getTime()>new Date(event.start).getTime()?{color:'#8D97AB'}:null]}>
                        {new XDate(event.start).toString(formatTime)} - {new XDate(event.end).toString(formatTime)}
                    </Text>
                </View>
            {/* ) : null} */}
            {/* {numberOfLines > 2 ? (<Text style={styles.eventTimes} numberOfLines={1}>
                {new XDate(event.start).toString("dd/mm/yyyy") +"  "}
                {new XDate(event.start).toString(formatTime)} - {new XDate(event.end).toString(formatTime)}
            </Text>) : null} */}
        </View>)}
    </TouchableOpacity>);
};
export default EventBlock;
