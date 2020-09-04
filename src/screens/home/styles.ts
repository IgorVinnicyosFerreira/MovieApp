import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FlatList, FlatListProps } from 'react-native';

import theme from '../../theme';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${theme.white};
    justify-content: center;
    align-content: center;
    padding: ${hp('3%')}px ${wp('5%')}px 0px ${wp('5%')}px;
`;

export const AddIcon = styled(Icon).attrs({
    name: 'add-outline',
    size: hp('4.5%'),
})`
    margin-right: ${wp('2%')}px;
`;

export const TextEmptyMovieList = styled.Text`
    color: ${theme.black};
    font-size: ${hp('2.5%')}px;
    align-self: center;
`;

export const ChevronIcon = styled(Icon).attrs({
    name: 'chevron-forward-outline',
})`
    font-size: ${hp('3.3%')}px;
`;
