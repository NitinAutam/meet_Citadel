import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

type Props = {
  onLike: () => void;
  onDislike: () => void;
};

export default function ActionButtons({ onLike, onDislike }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dislike} onPress={onDislike}>
        <Text style={[styles.text, { color: '#08f783ff' }]}>Dislike</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.like} onPress={onLike}>
        <Text style={[styles.text, { color: '#000' }]}>Like</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent:"center",
    marginBottom:10,
    marginHorizontal:7,
  },
  dislike: {
    borderWidth: 0,
    borderColor: '#333',
    padding: 16,
    marginRight:5,
    borderRadius: 12,
    backgroundColor: '#1d1d1dff',
    width: '45%',
    alignItems: 'center',
  },
  like: {
    backgroundColor: '#07f582ff',
    padding: 16,
    borderRadius: 12,
    marginLeft:5,
    width: '45%',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: '900',
  },
});
