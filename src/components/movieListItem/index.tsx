import React from 'react';
import {
    Container,
    Poster,
    Title,
    TextContainer,
    Year,
    ChildrenContainer,
} from './styles';

interface IProps {
    title: string;
    poster: string;
    year: string;
}

const MovieListItem: React.FC<IProps> = (props) => {
    return (
        <Container>
            <Poster source={{ uri: props.poster }} />
            <TextContainer>
                <Title numberOfLines={2}>{props.title}</Title>
                <Year>{props.year}</Year>
            </TextContainer>
            <ChildrenContainer>
                {props.children && props.children}
            </ChildrenContainer>
        </Container>
    );
};

export default MovieListItem;
