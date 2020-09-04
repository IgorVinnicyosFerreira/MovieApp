import styled from 'styled-components/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import theme from '../../theme';
import Icon from 'react-native-vector-icons/Ionicons';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${theme.white};
`;

export const ScrollView = styled.ScrollView.attrs({
    showsVerticalScrollIndicator: false,
})`
    flex: 1;
`;

export const PosterContainer = styled.View`
    width: ${wp('100%')}px;
    flex-direction: row;
    justify-content: flex-end;
`;

export const Poster = styled.Image.attrs({ resizeMode: 'cover' })`
    height: ${hp('60%')}px;
    width: ${wp('90%')}px;
    border-bottom-left-radius: ${hp('4%')}px;
`;

export const BackButton = styled.TouchableOpacity`
    height: ${hp('7%')}px;
    width: ${hp('7%')}px;
    border-radius: ${hp('3.5%')}px;
    background-color: ${theme.white};
    top: ${hp('10%')}px;
    left: ${wp('3%')}px;
    position: absolute;
    justify-content: center;
    align-items: center;
`;

export const BackIcon = styled(Icon).attrs({ name: 'chevron-back-outline' })`
    font-size: ${hp('4%')}px;
    color: ${theme.black};
`;

export const FavoriteButton = styled.TouchableOpacity`
    background-color: ${theme.secondary};
    height: ${hp('11%')}px;
    width: ${wp('19%')}px;
    border-bottom-left-radius: ${hp('4%')}px;
    border-top-right-radius: ${hp('4%')}px;
    position: absolute;
    left: ${wp('10%')}px;
    top: ${hp('49%')}px;
    justify-content: center;
    align-items: center;
`;

interface IPropsFavoriteIcon {
    isFavorite: boolean;
}
export const FavoriteIcon = styled(Icon)`
    font-size: ${hp('4.5%')}px;
    color: ${theme.white};
`;

export const Title = styled.Text.attrs({
    numberOfLines: 3,
})`
    font-size: ${hp('4%')}px;
    color: ${theme.black};
    font-weight: bold;
    margin: ${hp('3%')}px ${wp('5%')}px 0px ${wp('11%')}px;
`;

export const InfoContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 0px ${wp('11%')}px 0px ${wp('11%')}px;
`;

export const DataContainer = styled.View`
    justify-content: space-between;
    height: ${hp('8%')}px;
    margin-top: ${hp('2.5%')}px;
`;

export const MovieInfoTitle = styled.Text`
    font-size: ${hp('2%')}px;
    color: ${theme.grey};
    font-weight: 600;
`;

export const MovieInfoValue = styled.Text`
    font-size: ${hp('3%')}px;
    color: ${theme.black};
    font-weight: bold;
`;

export const PlotContainer = styled.View`
    background-color: ${theme.primary};
    min-height: ${hp('28%')}px;
    width: ${wp('100%')}px;
    margin-top: ${hp('3%')}px;
    border-top-left-radius: ${hp('8.5%')}px;
    padding-top: ${hp('3%')}px;
`;

export const SectionTitle = styled.Text`
    font-size: ${hp('3.5%')}px;
    color: ${theme.black};
    font-weight: bold;
    margin: 0px ${wp('11%')}px ${hp('3%')}px ${wp('11%')}px;
`;

export const SectionText = styled.Text.attrs({
    numberOfLines: 10,
})`
    font-size: ${hp('2.5%')}px;
    color: ${theme.black};
    font-weight: 100;
    margin: 0px ${wp('11%')}px ${hp('3%')}px ${wp('11%')}px;
`;

export const ActorsContainer = styled(PlotContainer)`
    background-color: ${theme.secondary};
    margin-top: 0px;
`;

export const DirectorContainer = styled(PlotContainer)`
    background-color: ${theme.blue};
    margin-top: 0px;
`;
