export default function extractInitial(nickname: string) {
  if (nickname) {
    return nickname[0].toUpperCase();
  }
}
