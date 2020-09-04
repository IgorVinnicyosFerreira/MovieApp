import styled from 'styled-components/native';
import theme from '../../theme';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const Container = styled.View`
    flex-direction: row;
    align-items: center;
    width: ${wp('100%')}px;
    height: ${hp('15%')}px;
    margin: ${hp('1%')}px 0px ${hp('1%')}px 0px;
`;

export const Poster = styled.Image.attrs({
    resizeMode: 'cover',
})`
    width: ${wp('20%')}px;
    height: ${hp('15%')}px;
    border-radius: ${hp('1%')}px;
`;

export const TextContainer = styled.View`
    margin-left: ${wp('3%')}px;
    width: ${wp('55%')}px;
`;

export const Title = styled.Text`
    font-size: ${hp('2.5%')}px;
    font-weight: bold;
    color: ${theme.black};
`;

export const Year = styled.Text`
    font-size: ${hp('2.2%')}px;
    color: ${theme.grey};
`;

export const ChildrenContainer = styled.View`
    margin-left: ${wp('4%')}px;
`;
