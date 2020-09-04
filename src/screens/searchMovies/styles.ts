import styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

import theme from '../../theme';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${theme.white};
    padding: ${hp('3%')}px ${wp('5%')}px 0px ${wp('5%')}px;
`;

export const SearchContainer = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: ${theme.lightGray};
    border-radius: ${hp('3%')}px;
    padding: 0px ${wp('5%')}px 0px ${wp('5%')}px;
    width: ${wp('90%')}px;
    height: ${hp('6%')}px;
    margin-bottom: ${hp('4%')}px;
`;

export const SearchInput = styled.TextInput.attrs({
    selectionColor: `${theme.primary}`,
})`
    padding-left: ${wp('3.5%')}px;
    font-size: ${hp('2.5%')}px;
    width: ${wp('75%')}px;
`;

export const SearchIcon = styled(Icon)`
    font-size: ${hp('2.5%')}px;
`;

export const HearthIcon = styled(Icon)`
    font-size: ${hp('3.3%')}px;
    color: ${theme.secondary};
`;

export const LoadingIndicator = styled.ActivityIndicator.attrs({
    color: theme.primary,
    size: 'large',
})``;

export const TextMoviesNotFound = styled.Text`
    color: ${theme.grey};
    font-size: ${hp('2%')}px;
`;
