export default function extractInitial(nickname: string | undefined) {
  if (nickname) {
    return nickname[0].toUpperCase();
  }
}
