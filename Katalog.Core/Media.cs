namespace Katalog.Core;

// Properties like RawData and Resolution are not abstracted to loosen coupling.
// An intermediary interface like SubmissionContent2D, which videos and images inherit, 
// wouldn't be able to adapt to vector graphics for example, which don't normally have resolution

public interface IMedia
{
    public string FileName { get; init; }
}

public record ImageMedia : IMedia
{
    public string FileName { get; init; }
    public byte[] RawData { get; init; }
    
    public int ResolutionWidth { get; init; }
    public int ResolutionHeight { get; init; }
    public double AspectRatio => (double) ResolutionWidth / ResolutionHeight;
}

public record VideoMedia : IMedia
{
    public string FileName { get; init; }
    public byte[] RawData { get; init; }
    
    public int ResolutionWidth { get; init; }
    public int ResolutionHeight { get; init; }
    public double AspectRatio => (double) ResolutionWidth / ResolutionHeight;
    
    public TimeSpan Duration { get; init; }
    public decimal FrameRate { get; init; }
}