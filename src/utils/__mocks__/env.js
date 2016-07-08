const env = jest.genMockFromModule('./../env')
env.isServerSide = () => true

module.exports = env
